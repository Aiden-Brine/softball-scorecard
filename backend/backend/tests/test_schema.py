"""
Tests for schema
"""

import pytest
from typing import List
from graphene.test import Client
from model_bakery import baker

from games.models import Game
from backend.schema import schema


@pytest.fixture
def client():
    return Client(schema=schema)


class TestGames:
    """
    Unit tests for games query
    """

    _GAMES_QUERY = """
    query getGames {
        games {
            id
        }
    }
    """

    @pytest.mark.django_db
    def test_returns_games(self, client):
        """
        Should return all of the games
        """
        games = baker.make("games.Game", _quantity=3)
        # Reverse the list since games should be returned in reverse order of
        # when they are created
        games.reverse()
        response = client.execute(self._GAMES_QUERY, context={})
        returned_games = response["data"]["games"]
        expected_games = [{"id": str(game.id)} for game in games]
        assert returned_games == expected_games
