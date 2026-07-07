from django.contrib import admin

from settings.models import NotificationBatch


@admin.register(NotificationBatch)
class NotificationBatchAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "notification_type",
        "recipient",
        "sent_count",
        "delivered_count",
        "failed_count",
        "status",
        "created_at",
    )

    list_filter = (
        "notification_type",
        "status",
    )

    search_fields = (
        "title",
        "recipient",
    )

    ordering = (
        "-created_at",
    )