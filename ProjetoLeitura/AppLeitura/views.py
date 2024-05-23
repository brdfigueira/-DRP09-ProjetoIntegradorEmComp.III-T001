from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.contrib.admin.views.decorators import staff_member_required
from .models import Author

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()

    return render(request, 'register.html', {'form': form})

@staff_member_required
def set_writer_of_the_day(request, author_id):
    Author.objects.update(is_writer_of_the_day=False)
    author = Author.objects.get(pk=author_id)
    author.is_writer_of_the_day = True
    author.save()
    return redirect('index')

def index(request):
    writer_of_the_day = Author.objects.filter(is_writer_of_the_day=True).first()
    return render(request, 'index.html', {'writer_of_the_day': writer_of_the_day})

def admin_index(request):
    return render(request, 'Admin_index.html')

def visitante_index(request):
    return render(request, 'Visitante_index.html')