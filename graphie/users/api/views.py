from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def hi(request):
    routes = ['emily', 'zhang']
    return Response(routes)