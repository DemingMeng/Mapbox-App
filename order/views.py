from http.client import BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from yaml import serialize
from .models import Post
from .serializers import PostSerializer,PostSerializerWithID
from rest_framework import status, permissions,authentication
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.utils.decorators import method_decorator
from User.models import User
# Create your views here.
class create_post(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required)
    def post(self,request):
            
            data = request.data
            data["user"] = request.user.id
       
            objects = PostSerializer(data =data)

            if objects.is_valid():
             
                objects.save()
                return Response(status=status.HTTP_200_OK) 
            print(objects.errors)
            return Response(status = status.HTTP_400_BAD_REQUEST)

class get_all_post(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self,request):
        data = Post.objects.all()
        res = PostSerializerWithID(data,many = True)
        return Response(res.data)
class delete_post(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required)
    def post(self,request):

        queryset = Post.objects.filter(Q(user= request.user.id)&Q(id= request.data["id"]))
 
        if queryset:
            queryset.delete()
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status =status.HTTP_400_BAD_REQUEST)
