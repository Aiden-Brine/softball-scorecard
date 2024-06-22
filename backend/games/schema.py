import graphene
from django.conf import settings
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
    innings = graphene.List(InningType)

    class Meta:
        model = Game
        fields = ("id", "opponent", "is_home", "date", "innings")

    def resolve_innings(self, info):
        return self.innings.all()


class Query(graphene.ObjectType):
    games = graphene.List(GameType)

    def resolve_games(self, info):
        return Game.objects.all()


class CreateGame(graphene.Mutation):
    class Arguments:
        opponent = graphene.String()
        is_home = graphene.Boolean()

    game = graphene.Field(GameType, required=True)

    # @transaction.automic
    def mutate(self, info, opponent, is_home):
        game = Game.objects.create(opponent=opponent, is_home=is_home)
        for inning in range(1, settings.NUM_INNINGS + 1):
            top_frame = Frame.objects.create()
            bottom_frame = Frame.objects.create()
            Inning.objects.create(
                game=game, number=inning, top_frame=top_frame, bottom_frame=bottom_frame
            )
        return CreateGame(game=game)


class UpdateScore(graphene.Mutation):
    class Arguments:
        frame_id = graphene.ID()
        new_score = graphene.Int()

    # game = graphene.Field(GameType, required=True)
    frame = graphene.Field(FrameType, required=True)

    # @transaction.automic
    def mutate(self, info, frame_id, new_score):
        # from ipdb import set_trace

        # set_trace()
        frame = Frame.objects.get(id=frame_id)
        frame.score = new_score
        frame.save()
        # game = Game.objects.get(innings=frame.inning)

        return UpdateScore(frame=frame)


class Mutation(graphene.ObjectType):
    create_game = CreateGame.Field()
    update_score = UpdateScore.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
