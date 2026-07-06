from rest_framework import serializers


class DashboardSummarySerializer(
    serializers.Serializer
):

    total_sent = serializers.IntegerField()

    delivered = serializers.IntegerField()

    failed = serializers.IntegerField()

    delivery_rate = serializers.IntegerField()


class NotificationTypeSerializer(
    serializers.Serializer
):

    name = serializers.CharField()

    value = serializers.IntegerField()


class DeliveryPerformanceSerializer(
    serializers.Serializer
):

    batch = serializers.CharField()

    delivered = serializers.IntegerField()

    failed = serializers.IntegerField()


class NotificationHistorySerializer(
    serializers.Serializer
):

    id = serializers.IntegerField()

    type = serializers.CharField()

    recipient = serializers.CharField()

    sent = serializers.IntegerField()

    delivered = serializers.IntegerField()

    failed = serializers.IntegerField()

    rate = serializers.CharField()

    timestamp = serializers.CharField()

    status = serializers.CharField()



class DashboardSerializer(
    serializers.Serializer
):

    summary = DashboardSummarySerializer()

    types = NotificationTypeSerializer(
        many=True
    )

    delivery = DeliveryPerformanceSerializer(
        many=True
    )

    history = NotificationHistorySerializer(
        many=True
    )