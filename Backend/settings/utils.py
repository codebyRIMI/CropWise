from .models import (
    NotificationPreference,
    AnalyticsEvent,
    Notification,
    NotificationBatch,
)


from datetime import timedelta
from django.utils import timezone
import requests






# it is to reverse geocode lat and lon to city state country using nominatim api
def reverse_geocode(lat, lon):
    url = "https://nominatim.openstreetmap.org/reverse"

    response = requests.get(
        url,
        params={
            "lat": lat,
            "lon": lon,
            "format": "json"
        },
        headers={
            "User-Agent": "CropWise"
        },
        timeout=5
    )

    data = response.json()

    address = data.get("address", {})

    return {
        "city": (
            address.get("city")
            or address.get("town")
            or address.get("village")
            or ""
        ),
        "state": address.get("state", ""),
        "country": address.get("country", "")
    }





def log_analytics_event(user, event_name):
    try:
        pref = NotificationPreference.objects.get(user=user)

        if pref.share_analytics:
            AnalyticsEvent.objects.create(
                user=user,
                event_name=event_name
            )

    except NotificationPreference.DoesNotExist:
        pass




def create_notification(
    user,
    notification_type,
    title,
    message,
    batch=None
):
    pref, _ = NotificationPreference.objects.get_or_create(
        user=user
    )

    allowed = False

    if (
        notification_type == "weather"
        and pref.weather_alerts
    ):
        allowed = True

    elif (
        notification_type == "market"
        and pref.market_prices
    ):
        allowed = True

    elif (
        notification_type == "system"
        and pref.systemknowledge_updates
    ):
        allowed = True

    if not allowed:
        return None

    # Prevent duplicates for 6 hours

    six_hours_ago = timezone.now() - timedelta(hours=6)

    already_exists = Notification.objects.filter(
        user=user,
        notification_type=notification_type,
        title=title,
        message=message,
        created_at__gte=six_hours_ago
    ).exists()

    if already_exists:
        return None

    notification = Notification.objects.create(
        user=user,
        batch=batch,
        notification_type=notification_type,
        title=title,
        message=message,
        delivery_status="pending"
    )

    if batch:
        batch.sent_count += 1
        batch.save(update_fields=["sent_count"])

    send_notification_ws(
        user,
        notification
    )

    return notification




def check_weather_alerts(current):

    alerts = []

    precipitation = current.get(
        "precipitation_probability"
    )

    wind_speed = current.get(
        "wind_speed"
    )

    weather_code = current.get(
        "weather_code"
    )

    temperature = current.get(
        "temperature"
    )


    if precipitation and precipitation >= 70:

        alerts.append({
            "title": "Heavy Rain Alert",
            "message":
            "Heavy rainfall is expected.",
        })


    if wind_speed and wind_speed >= 25:

        alerts.append({
            "title": "Strong Wind Alert",
            "message":
            "Strong winds detected.",
        })


    if weather_code in [8000, 8001]:

        alerts.append({
            "title": "Thunderstorm Alert",
            "message":
            "Thunderstorm conditions detected.",
        })


    if temperature is not None and temperature >= 40:

        alerts.append({
            "title": "Heatwave Alert",
            "message":
            "High temperatures detected.",
        })


    if temperature is not None and temperature <= 5:

        alerts.append({
            "title": "Cold Wave Alert",
            "message":
            "Low temperatures detected.",
        })


    return alerts


from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.utils import timezone

def send_notification_ws(
    user,
    notification
):

    try:

        channel_layer = get_channel_layer()

        async_to_sync(
            channel_layer.group_send
        )(
            f"user_{user.id}",
            {
                "type": "notification_message",
                "data": {
                    "id": notification.id,
                    "title": notification.title,
                    "message": notification.message,
                    "notification_type": notification.notification_type,
                    "created_at": notification.created_at.isoformat()
                }
            }
        )

        notification.delivery_status = "delivered"
        notification.delivered_at = timezone.now()
        notification.save(
            update_fields=[
                "delivery_status",
                "delivered_at"
            ]
        )

        if notification.batch:

            batch = notification.batch

            batch.delivered_count += 1

            if (
                batch.sent_count ==
                batch.delivered_count +
                batch.failed_count
            ):
                batch.status = "completed"

            batch.save()

    except Exception:

        notification.delivery_status = "failed"

        notification.save(
            update_fields=["delivery_status"]
        )

        if notification.batch:

            batch = notification.batch

            batch.failed_count += 1

            if (
                batch.sent_count ==
                batch.delivered_count +
                batch.failed_count
            ):
                batch.status = "completed"

            batch.save()




def create_notification_batch(
    users,
    notification_type,
    title,
    message,
    recipient="All Users"
):
    

    six_hours_ago = timezone.now() - timedelta(hours=6)

    batch = NotificationBatch.objects.filter(
        title=title,
        notification_type=notification_type,
        recipient=recipient,
        created_at__gte=six_hours_ago,
    ).first()

    if batch:

        for user in users:

            create_notification(
                user=user,
                notification_type=notification_type,
                title=title,
                message=message,
                batch=batch,
            )

        return batch

    batch = NotificationBatch.objects.create(
        title=title,
        notification_type=notification_type,
        recipient=recipient,
    )


    for user in users:

        create_notification(
            user=user,
            notification_type=notification_type,
            title=title,
            message=message,
            batch=batch
        )

    return batch