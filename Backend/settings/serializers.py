from rest_framework import serializers
from .models import Notification, NotificationPreference
from .models import UserPreference
from .models import UserLocation
from .models import AnalyticsEvent


class NotificationPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPreference
        fields = '__all__'
        read_only_fields = ['user']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"

class UserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = "__all__"
        read_only_fields = ["user"]


class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsEvent
        fields = "__all__"




#preferences
class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = "__all__"
        read_only_fields = ["user"]

#update password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password]
    )
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return attrs