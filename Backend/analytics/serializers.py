from rest_framework import serializers

class AnalyticsSerializer(serializers.Serializer):

    total_revenue = serializers.FloatField()

    total_expenses = serializers.FloatField()

    total_profit = serializers.FloatField()

    average_yield = serializers.FloatField()

    quality_rate = serializers.FloatField()

    profit_margin = serializers.FloatField()

    yield_chart = serializers.ListField()

    financial_chart = serializers.ListField()

    crop_distribution = serializers.ListField()

    environmental = serializers.ListField()

    achievements = serializers.DictField()