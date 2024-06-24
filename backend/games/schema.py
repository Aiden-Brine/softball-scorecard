"""
games app GraphQL schema
"""

import graphene
from django.conf import settings
from django.db import transaction
from django.db.models import QuerySet
from graphene_django import DjangoObjectType
from graphql.type import GraphQLResolveInfo

from games.models import Game, Inning, Frame


class FrameType(DjangoObjectType):
    """
    Frame object type
    """

    class Meta:
        model = Frame
        fields = ("id", "score")


class InningType(DjangoObjectType):
    """
    Inning object type
    """

    class Meta:
        model = Inning
        fields = ("id", "number", "top_frame", "bottom_frame")


class GameType(DjangoObjectType):
    """
    Game object type
    """

    innings = graphene.List(graphene.NonNull(InningType), required=True)

    class Meta:
        model = Game
        fields = ("id", "opponent", "is_home", "date", "innings")

    def resolve_innings(self, info: GraphQLResolveInfo) -> QuerySet:
        del info
        # self.innings is being mistyped as a List instead of a QuerySet
        return self.innings.all()  # type: ignore


class CreateGame(graphene.Mutation):
    """
    Mutation to generate a new Game
    """

    class Arguments:
        opponent = graphene.String()
        is_home = graphene.Boolean()

    game = graphene.Field(GameType, required=True)

    @transaction.atomic
    def mutate(
        self, info: GraphQLResolveInfo, opponent: str, is_home: bool
    ) -> "CreateGame":
        """
        Create a game and its related innings and frames
        """
        del info
        game = Game.objects.create(opponent=opponent, is_home=is_home)
        for inning in range(1, settings.NUM_INNINGS + 1):
            top_frame = Frame.objects.create()
            bottom_frame = Frame.objects.create()
            Inning.objects.create(
                game=game, number=inning, top_frame=top_frame, bottom_frame=bottom_frame
            )
        # This is the recommended approach:
        # https://docs.graphene-python.org/en/latest/types/mutations/
        return CreateGame(game=game)  # type: ignore


class UpdateScore(graphene.Mutation):
    """
    Mutation to update the score of a frame
    """

    class Arguments:
        frame_id = graphene.ID()
        new_score = graphene.Int()

    frame = graphene.Field(FrameType, required=True)

    def mutate(
        self, info: GraphQLResolveInfo, frame_id: int, new_score: int
    ) -> "UpdateScore":
        """
        Update the score of Frame with frame_id to new_score
        """
        del info
        frame = Frame.objects.get(id=frame_id)
        frame.score = new_score
        frame.save()

        return UpdateScore(frame=frame)  # type: ignore
