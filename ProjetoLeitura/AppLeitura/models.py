from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    death_date = models.DateField(null=True, blank=True)
    num_works = models.IntegerField()
    is_writer_of_the_day = models.BooleanField(default=False)