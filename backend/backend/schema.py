"""
GraphQL schema
"""

import graphene
from graphql.type import GraphQLResolveInfo

from games.models import Game
from games.schema import CreateGame, GameType, UpdateScore


class Query(graphene.ObjectType):
    """
    Base query object type
    """

    games = graphene.List(GameType)

    def resolve_games(self, info: GraphQLResolveInfo):
        """
        Resolve a list of all Games
        """
        del info
        return Game.objects.order_by("-date").all()


class Mutation(graphene.ObjectType):
    """
    Base mutation object type
    """

    create_game = CreateGame.Field()
    update_score = UpdateScore.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
