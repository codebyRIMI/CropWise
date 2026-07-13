from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Sum, Avg, Count
from django.db.models.functions import TruncMonth

from records.models import (
    PlantingRecord,
    HarvestRecord,
    SaleRecord,
    ExpenseRecord,
    ResourceUsage,
)


class AnalyticsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        # -------------------------
        # Logged in user
        # -------------------------
        user = request.user

        # print("=" * 50)
        # print("Logged in user:", request.user)
        # print("Authenticated:", request.user.is_authenticated)
        # print("Plantings:", PlantingRecord.objects.filter(user=user).count())
        # print("Harvests:", HarvestRecord.objects.filter(user=user).count())
        # print("Sales:", SaleRecord.objects.filter(user=user).count())
        # print("Expenses:", ExpenseRecord.objects.filter(user=user).count())
        # print("=" * 50)

        # -------------------------
        # Total Revenue
        # -------------------------
        sales = SaleRecord.objects.filter(user=user)

        total_revenue = 0

        for sale in sales:
            total_revenue += sale.quantity * sale.price_per_ton

        # -------------------------
        # Total Expenses
        # -------------------------
        expenses = ExpenseRecord.objects.filter(user=user)

        total_expenses = (
            expenses.aggregate(total=Sum("amount"))["total"] or 0
        )

        # -------------------------
        # Total Profit
        # -------------------------
        total_profit = total_revenue - total_expenses

        # -------------------------
        # Profit Margin
        # -------------------------
        if total_revenue > 0:
            profit_margin = (total_profit / total_revenue) * 100
        else:
            profit_margin = 0

        # ------------------------- 
        # Average Yield
        # -------------------------
        harvests = HarvestRecord.objects.filter(user=user)

        yield_sum = 0

        for harvest in harvests:
            if harvest.area > 0:
                yield_sum += harvest.total_harvest / harvest.area

        average_yield = (
            yield_sum / harvests.count()
            if harvests.exists()
            else 0
        )

                # -------------------------
        # -------------------------
        # Quality Rate
        # -------------------------
        good = harvests.filter(
            quality__in=["Excellent", "Good"]
        ).count()

        total = harvests.count()

        quality_rate = (
            (good / total) * 100
            if total
            else 0
        )

        # -------------------------
        # Yield Chart
        # -------------------------
        yield_chart = []

        for harvest in harvests:
            if harvest.area > 0:
                yield_chart.append({
                    "month": harvest.harvest_date.strftime("%b"),
                    "yield": round(
                        harvest.total_harvest / harvest.area,
                        2
                    )
                })

        # -------------------------
        # Financial Chart
        # -------------------------
        financial_chart = [
            {
                "month": "Jul",
                "revenue": total_revenue,
                "expenses": total_expenses,
                "profit": total_profit,
            }
        ]

        # -------------------------
        # Environment
        # -------------------------
        environment = {}

        latest = harvests.order_by("-harvest_date").first()

        if latest:
            environment = {
                "crop": latest.crop,
                "field": latest.field_name,
                "area": latest.area,
                "yield": latest.total_harvest,
                "quality": latest.quality,
                "date": latest.harvest_date.strftime("%d/%m/%Y"),
            }

        # -------------------------
        # Crop Distribution
        # -------------------------
        crop_distribution = []

        plantings = PlantingRecord.objects.filter(user=user)

        total_area = (
            plantings.aggregate(total=Sum("area"))["total"] or 0
        )

        for planting in plantings:
            percentage = 0

            if total_area > 0:
                percentage = (
                    planting.area / total_area
                ) * 100

            crop_distribution.append({
                "name": planting.crop,
                "value": round(percentage, 2)
            })

        # -------------------------
        # Achievements
        # -------------------------
        achievements = {
            "best_yield": round(average_yield, 2),
            "quality_rate": round(quality_rate, 2),
            "profit_margin": round(profit_margin, 2),
            "plantings": plantings.count(),
            "harvests": harvests.count(),
        }

        # -------------------------
        # Send Response
        # -------------------------
        response_data = {
            "total_revenue": total_revenue,
            "total_expenses": total_expenses,
            "total_profit": total_profit,
            "profit_margin": profit_margin,
            "average_yield": average_yield,
            "quality_rate": quality_rate,

            "yield_chart": yield_chart,
            "financial_chart": financial_chart,
            "crop_distribution": crop_distribution,
            "environment": environment,
            "achievements": achievements,
        }

        print(response_data)

        return Response(response_data)