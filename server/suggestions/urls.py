from django.urls import path
from .views import SuggestionListView, CreateSuggestion, UpdateSuggestion, DeleteSuggestion, SuggestionView


urlpatterns = [
    path('', SuggestionListView.as_view()),
    path('create', CreateSuggestion.as_view()),
    path('update/<int:pk>', UpdateSuggestion.as_view()),
    path('delete/<int:pk>', DeleteSuggestion.as_view()),
    path('<pk>', SuggestionView.as_view()),
]
