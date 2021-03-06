from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveDestroyAPIView, CreateAPIView, RetrieveAPIView
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission


# Custom permission if user is not the creator return error
class EditCustomPermission(BasePermission):
    message = 'Editing Comments is restricted to the creator only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user


# If non permission classes default is IsAuthenticated
class CommentListView(ListAPIView):
    # List all comments
    queryset = Comment.objects.order_by('-date_created')
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentView(RetrieveAPIView):
    # List comment by id
    queryset = Comment.objects.order_by('-date_created')
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CreateComment(CreateAPIView):
    # Create comment
    queryset = Comment.objects.order_by('-date_created')
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class UpdateComment(UpdateAPIView, EditCustomPermission):
    # Update Comment 'authopr only'
    queryset = Comment.objects.order_by('-date_created')
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [EditCustomPermission]


class DeleteComment(RetrieveDestroyAPIView, EditCustomPermission):
    # Delete Comment 'authopr only'
    queryset = Comment.objects.order_by('-date_created')
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [EditCustomPermission, ]


# The IsAdminUser permission class will deny permission to any user, unless user.is_staff is True in which case permission will be allowed.
# This permission is suitable if you want your API to only be accessible to a subset of trusted administrators.

