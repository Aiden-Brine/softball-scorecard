# """
# Tests for the games schema
# """
# import pytest

# from games.models import Game
# from games.schema import GameType
# from backend.tests.utils import gen_stub_graphql_client

# @pytest.fixture()
# def game():
#     return Game.objects.create(opponent="foo", is_home=False)

# @pytest.fixture()
# def client():
#     return gen_stub_graphql_client("game", GameType, game)

# # class SchemaTests:
