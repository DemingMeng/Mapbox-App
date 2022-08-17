from distutils.command.upload import upload
from turtle import title
from django.db import models
from sqlalchemy import ForeignKey
from User.models import User

class Post(models.Model):
    id = models.IntegerField( primary_key=True,auto_created=True)
    user = models.ForeignKey(User,related_name="user" ,on_delete=models.CASCADE)
    address = models.CharField(max_length=128)
    price = models.FloatField(max_length=12)
    discription = models.CharField(max_length=400)
    image = models.ImageField(upload_to ="./upload", blank = True, null = True)
    startDate  =models.DateField()
    endDate = models.DateField()
    latitude = models.FloatField(max_length=30)
    langitude = models.FloatField(max_length=30)
    title = models.CharField(max_length=40)

# Create your models here.
