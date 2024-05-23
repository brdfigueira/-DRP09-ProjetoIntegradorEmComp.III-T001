import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from AppLeitura.models import Author

class Command(BaseCommand):
    help = 'Updates the list of authors'

    def handle(self, *args, **options):
        response = requests.get('https://brazilianpublishers.com.br/en/autores/')
        soup = BeautifulSoup(response.text, 'html.parser')

        for author_div in soup.find_all('div', class_='author'):
            name = author_div.find('h2').text
            birth_date = author_div.find('div', class_='birth-date').text
            death_date = author_div.find('div', class_='death-date').text
            num_works = len(author_div.find_all('div', class_='work'))

            Author.objects.update_or_create(
                name=name,
                defaults={
                    'birth_date': birth_date,
                    'death_date': death_date or None,
                    'num_works': num_works,
                }
            )