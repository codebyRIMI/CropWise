from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
    RegisterRequestView,
    VerifyEmailView,
)


urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
<<<<<<< HEAD
]
=======
    path('forgot-password', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password', ResetPasswordView.as_view(), name='reset-password'),
    path('register-request', RegisterRequestView.as_view()),
    path(
        "verify-email/<str:token>/",
        VerifyEmailView.as_view(),
        name="verify-email"
    )
]
>>>>>>> 4056922a66f416de61d9290e027a64967c5d184d
