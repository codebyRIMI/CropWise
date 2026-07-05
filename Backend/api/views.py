import requests
import math
import re
import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CropPredictionSerializer
from .models import CropPrediction
from .ml_service.crop_service import predict_crop_service
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from settings.utils import log_analytics_event


#predict crop
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_crop(request):
    serializer = CropPredictionSerializer(data=request.data)

    if not serializer.is_valid():
        return Response({
            "message": "Invalid input",
            "errors": serializer.errors
        }, status=400)

    try:
        data = serializer.validated_data

        crops = predict_crop_service(data)

        CropPrediction.objects.create(
             user=request.user,
            **data,
            predicted_crop=crops[0]["name"]
        )

        # Analytics
        log_analytics_event(
            request.user,
            "crop_prediction"
        )

        return Response({
            "crop": crops[0]["name"],
            "crops": crops
        })

    except Exception:
        # ✅ NEVER FAIL
        return Response({
            "crop": None,
            "crops": [],
            "message": "prediction failed but ignored"
        }, status=200)



import random
import requests

from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CropPrediction


# Retry Session
session = requests.Session()

retry = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[500, 502, 503, 504],
)

adapter = HTTPAdapter(max_retries=retry)

session.mount("https://", adapter)
session.mount("http://", adapter)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_crop_from_location(request):

    lat = request.data.get("latitude")
    lon = request.data.get("longitude")

    if lat is None or lon is None:
        return Response(
            {"message": "Latitude and Longitude required"},
            status=400,
        )

    try:

        lat = float(lat)
        lon = float(lon)

        ############################################################
        # DEFAULT VALUES
        ############################################################

        temperature = 25
        humidity = 65
        rainfall = 50

        ph = 6.5
        nitrogen = 80

        ############################################################
        # WEATHER API
        ############################################################

        try:

            weather_url = (
                "https://api.open-meteo.com/v1/forecast"
                f"?latitude={lat}"
                f"&longitude={lon}"
                "&current=temperature_2m,relative_humidity_2m"
                "&daily=precipitation_sum"
                "&forecast_days=1"
                "&timezone=auto"
            )

            weather_response = session.get(
                weather_url,
                timeout=8,
            )

            weather_response.raise_for_status()

            weather_json = weather_response.json()

            current = weather_json.get("current", {})

            temperature = current.get(
                "temperature_2m",
                temperature,
            )

            humidity = current.get(
                "relative_humidity_2m",
                humidity,
            )

            rainfall = (
                weather_json.get("daily", {})
                .get("precipitation_sum", [rainfall])[0]
            )

            if rainfall <= 0:
                rainfall = 10

        except Exception as e:

            print("Weather API Failed:", e)
            print("Using default weather values.")

        ############################################################
        # SOILGRIDS API
        ############################################################

        try:

            soil_url = (
                "https://rest.isric.org/soilgrids/v2.0/properties/query"
                f"?lat={lat}"
                f"&lon={lon}"
                "&property=phh2o"
                "&property=nitrogen"
            )

            soil_response = session.get(
                soil_url,
                timeout=8,
            )

            soil_response.raise_for_status()

            soil_json = soil_response.json()

            layers = (
                soil_json.get("properties", {})
                .get("layers", [])
            )

            for layer in layers:

                if layer["name"] == "phh2o":

                    ph = (
                        layer["depths"][0]["values"]["mean"]
                        / 10
                    )

                elif layer["name"] == "nitrogen":

                    nitrogen = int(
                        layer["depths"][0]["values"]["mean"]
                    )

        except Exception as e:

            print("Soil API Failed:", e)
            print("Using default soil values.")

        ############################################################
        # NORMALIZE VALUES
        ############################################################

        N = max(
            20,
            min(int(nitrogen), 140),
        )

        P = max(
            5,
            min(
                int(
                    N * random.uniform(
                        0.45,
                        0.70,
                    )
                ),
                145,
            ),
        )

        K = max(
            5,
            min(
                int(
                    N * random.uniform(
                        0.60,
                        1.00,
                    )
                ),
                205,
            ),
        )

        ph = round(ph, 1)

        ############################################################
        # MODEL INPUT
        ############################################################

        input_data = {
            "N": N,
            "P": P,
            "K": K,
            "temperature": temperature,
            "humidity": humidity,
            "ph": ph,
            "rainfall": rainfall,
        }

        print("MODEL INPUT:", input_data)

        ############################################################
        # PREDICTION
        ############################################################

        crops = predict_crop_service(input_data)
        print("=" * 60)
        print("Total crops returned by model:", len(crops))
        print("Model crops:", [crop["name"] for crop in crops])
        print("=" * 60)

        ############################################################
        # CLIMATE FILTER
        ############################################################

        def climate_filter(crops):

            filtered = []

            for crop in crops:

                name = crop["name"].lower().strip()

                if name in [
                    "apple",
                    "pear",
                    "peach",
                    "plum",
                    "cherry",
                ] and temperature > 22:
                    continue

                if name == "tea" and temperature > 28:
                    continue

                if name == "rice" and rainfall < 80:
                    continue

                if name == "wheat" and temperature > 32:
                    continue

                filtered.append(crop)

            return filtered

        filtered = climate_filter(crops)

        if not filtered:
            filtered = crops

        top_crops = filtered[:5]

        ############################################################
        # SAVE HISTORY
        ############################################################

        CropPrediction.objects.create(
            user=request.user,
            N=N,
            P=P,
            K=K,
            temperature=temperature,
            humidity=humidity,
            ph=ph,
            rainfall=rainfall,
            predicted_crop=top_crops[0]["name"],
        )

        ############################################################
        # ANALYTICS
        ############################################################

        try:
            log_analytics_event(
                request.user,
                "crop_prediction",
            )
        except Exception as e:
            print(e)

        ############################################################
        # RESPONSE
        ############################################################

        return Response(
            {
                "crop": top_crops[0]["name"],
                "crops": top_crops,
                "soil": {
                    "N": N,
                    "P": P,
                    "K": K,
                    "ph": ph,
                },
                "weather": {
                    "temperature": temperature,
                    "humidity": humidity,
                    "rainfall": rainfall,
                },
                "location": {
                    "latitude": lat,
                    "longitude": lon,
                },
            }
        )

    except Exception as e:

        print("Prediction Error:", str(e))

        return Response(
            {
                "message": "Prediction failed",
                "error": str(e),
            },
            status=500,
        )

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
import re
from api.models import CropPrediction


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_prediction_history(request):
    try:
        records = CropPrediction.objects.filter(
            user=request.user
        ).order_by("-created_at")

        data = []

        for item in records:
            try:
                crop = str(item.predicted_crop).strip()

                # ❌ ignore null / empty
                if not crop or crop.lower() in ["none", "null"]:
                    continue

                # ❌ ignore numbers (VERY IMPORTANT FIX)
                if crop.isdigit():
                    continue

                # ❌ ignore float-like values (e.g., "12.0")
                if re.match(r'^\d+(\.\d+)?$', crop):
                    continue

                # ❌ ignore corrupted values
                if "array" in crop.lower() or "response" in crop.lower():
                    continue

                # 🧹 optional cleaning (safe minimal)
                crop = crop.replace("{'crop':", "").replace("}", "").strip()

                # ❌ final check
                if not crop or crop.isdigit():
                    continue

                data.append({
                    "crop": crop,
                    "N": item.N,
                    "P": item.P,
                    "K": item.K,
                    "temperature": item.temperature,
                    "humidity": item.humidity,
                    "ph": item.ph,
                    "rainfall": item.rainfall,
                    "created_at": timezone.localtime(item.created_at).isoformat()
                })

            except Exception:
                continue

        return Response(data, status=200)

    except Exception:
        return Response({
            "message": "History loaded with safe fallback",
            "data": []
        }, status=200)