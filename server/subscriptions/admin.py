from django.contrib import admin
from .models import Subscription


class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'price_id', 'date_created')
    list_display_links = ('title', 'price_id')
    search_fields = ('title', )
    list_filter = ('title', 'price', 'price_id', 'date_created',)
    list_per_page = 25

admin.site.register(Subscription, SubscriptionAdmin)