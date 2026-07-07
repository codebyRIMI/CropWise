from collections import defaultdict

from settings.models import UserLocation, NotificationBatch

from settings.utils import (
    check_weather_alerts,
    create_notification_batch,
)

from .services import (
    get_current_weather,
)


def run_weather_checks():

    grouped_locations = defaultdict(list)

    locations = (
        UserLocation.objects
        .select_related("user")
        .exclude(latitude__isnull=True)
        .exclude(longitude__isnull=True)
    )

    for location in locations:

        key = (
            round(location.latitude, 2),
            round(location.longitude, 2),
            location.city,
        )

        grouped_locations[key].append(location)


    for key, users_in_location in grouped_locations.items():

        first = users_in_location[0]

        try:

            current = get_current_weather(
                first.latitude,
                first.longitude,
            )

            alerts = check_weather_alerts(
                current
            )

            if not alerts:
                continue


            for alert in alerts:

                batch = create_notification_batch(

                    users=[
                        loc.user
                        for loc in users_in_location
                    ],

                    notification_type="weather",

                    title=alert["title"],

                    message=alert["message"],

                    recipient=(
                        first.city
                        if first.city
                        else "Current Location"
                    ),
                )

                print(
                    f"{batch.title} sent to "
                    f"{batch.sent_count} users."
                )

        except Exception as e:

            print(
                f"Weather check failed: {e}"
            )