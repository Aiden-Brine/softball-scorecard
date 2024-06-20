import graphene
from graphene_django import DjangoListField, DjangoObjectType

from games.models import Game, Inning, Frame


class FrameType(DjangoObjectType):
    class Meta:
        model = Frame
        fields = ("id", "score")


class InningType(DjangoObjectType):
    class Meta:
        model = Inning
        fields = ("id", "number", "top_frame", "bottom_frame")


class GameType(DjangoObjectType):
    innings = DjangoListField(InningType)

    class Meta:
        model = Game
        fields = ("id", "opponent", "home_team", "date", "innings")


class Query(graphene.ObjectType):
    games = graphene.List(GameType)

    def resolve_games(root, info):
        return Game.objects.all()


schema = graphene.Schema(query=Query)
