from django.urls import path

from .views import (
    DashboardSummaryView,
    DashboardView,
    NotificationTypeView,
    DeliveryPerformanceView,
    NotificationHistoryView,
)

urlpatterns = [

    path(
        "summary/",
        DashboardSummaryView.as_view(),
        name="notification-summary",
    ),

    path(
        "types/",
        NotificationTypeView.as_view(),
        name="notification-types",
    ),

    path(
        "delivery/",
        DeliveryPerformanceView.as_view(),
        name="notification-delivery",
    ),

    path(
        "history/",
        NotificationHistoryView.as_view(),
        name="notification-history",
    ),

    path(
        "dashboard/",
        DashboardView.as_view(),
        name="notification-dashboard",
    ),

]