"""
URL configuration for the backend of the project
"""

from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

# TODO: remove the csrf_exempt
urlpatterns = [
    path("admin/", admin.site.urls),
    path(r"graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
