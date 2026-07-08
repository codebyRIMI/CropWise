from django.db.models import (
    Count,
    Sum,
    Q,
)

from settings.models import (
    Notification,
    NotificationBatch,
)



def get_dashboard_summary():

    batches = NotificationBatch.objects.all()

    total_sent = (
        batches.aggregate(
            total=Sum("sent_count")
        )["total"] or 0
    )

    delivered = (
        batches.aggregate(
            total=Sum("delivered_count")
        )["total"] or 0
    )

    failed = (
        batches.aggregate(
            total=Sum("failed_count")
        )["total"] or 0
    )

    delivery_rate = 0

    if total_sent:
        delivery_rate = round(
            (delivered / total_sent) * 100
        )

    return {
        "total_sent": total_sent,
        "delivered": delivered,
        "failed": failed,
        "delivery_rate": delivery_rate,
    }



def get_notification_type_distribution():

    queryset = (

        NotificationBatch.objects

        .values(
            "notification_type"
        )

        .annotate(
            value=Sum("sent_count")
        )

        .order_by(
            "notification_type"
        )

    )

    mapping = {

        "weather":
        "Weather Alerts",

        "market":
        "Market Updates",

        "system":
        "System Messages",

    }

    result = []

    for item in queryset:

        result.append({

            "name":
            mapping.get(
                item["notification_type"],
                item["notification_type"].title()
            ),

            "value":
            item["value"] or 0,

        })

    return result



def get_delivery_performance():

    queryset = (

        NotificationBatch.objects

        .values(
            "notification_type"
        )

        .annotate(

            delivered=Sum(
                "delivered_count"
            ),

            failed=Sum(
                "failed_count"
            ),

        )

        .order_by(
            "notification_type"
        )

    )

    mapping = {

        "weather":
        "Weather",

        "market":
        "Market",

        "system":
        "System",

    }

    result = []

    for item in queryset:

        result.append({

            "batch":
            mapping.get(
                item["notification_type"],
                item["notification_type"].title()
            ),

            "delivered":
            item["delivered"] or 0,

            "failed":
            item["failed"] or 0,

        })

    return result



def get_notification_history(search=None):

    batches = NotificationBatch.objects.all()

    if search:

        batches = batches.filter(
            Q(title__icontains=search)
            |
            Q(recipient__icontains=search)
            |
            Q(status__icontains=search)
            |
            Q(notification_type__icontains=search)
        )

    batches = batches.order_by("-created_at")

    history = []

    for batch in batches:

        rate = 0

        if batch.sent_count:

            rate = round(
                (
                    batch.delivered_count
                    /
                    batch.sent_count
                )
                * 100
            )

        history.append({

            "id": batch.id,

            "type": batch.title,

            "recipient": batch.recipient,

            "sent": batch.sent_count,

            "delivered": batch.delivered_count,

            "failed": batch.failed_count,

            "rate": f"{rate}%",

            "timestamp": batch.created_at.strftime(
                "%Y-%m-%d %H:%M"
            ),

            "status": batch.status,
        })

    return history




def get_dashboard_data():

    return {

        "summary":
        get_dashboard_summary(),

        "types":
        get_notification_type_distribution(),

        "delivery":
        get_delivery_performance(),

        "history":
        get_notification_history(),
    }