from rest_framework.permissions import BasePermission


class IsStaffUser(BasePermission):
    """
    Custom permission that allows access only to authenticated staff users.
    """

    def has_permission(self, request, view):
        """
        Called before the API view executes.
        Returns True if the user is authenticated and is a staff member.
        Returns False otherwise.
        """

        return (
            request.user.is_authenticated
            and request.user.is_staff
        )