from django.db import models

# Create your models here.
class Todo(models.Model):
    id = models.CharField()
    name = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)