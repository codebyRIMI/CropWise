from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from .services import (
    get_dashboard_summary,
    get_notification_type_distribution,
    get_delivery_performance,
    get_notification_history,
)
from .services import (
    get_dashboard_data,
)


from .serializers import (
    DashboardSummarySerializer,
    NotificationTypeSerializer,
    DeliveryPerformanceSerializer,
    NotificationHistorySerializer,
)

from .serializers import (
    DashboardSerializer,
)


class DashboardSummaryView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        data = get_dashboard_summary()

        serializer = DashboardSummarySerializer(data)

        return Response(serializer.data)


class NotificationTypeView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        data = get_notification_type_distribution()

        serializer = NotificationTypeSerializer(
            data,
            many=True
        )

        return Response(serializer.data)


class DeliveryPerformanceView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        data = get_delivery_performance()

        serializer = DeliveryPerformanceSerializer(
            data,
            many=True
        )

        return Response(serializer.data)


class NotificationHistoryView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        search = request.GET.get(
            "search"
        )

        data = get_notification_history(
            search
        )

        serializer = NotificationHistorySerializer(
            data,
            many=True
        )

        return Response(serializer.data)
    


class DashboardView(APIView):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        data = get_dashboard_data()

        serializer = DashboardSerializer(
            data
        )

        return Response(
            serializer.data
        )