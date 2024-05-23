from django.urls import path
from . import views

urlpatterns = [
    path('admin/', views.admin_index, name='admin_index'),
    path('visitante/', views.visitante_index, name='visitante_index'),
]