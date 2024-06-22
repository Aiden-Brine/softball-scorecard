from django.db import models
from django.conf import settings
from django.db.models import Q
from datetime import datetime


class Game(models.Model):
    opponent = models.CharField(max_length=120)
    is_home = models.BooleanField()
    date = models.DateTimeField(default=datetime.now)

    def _str_(self):
        home_team_name, away_team_name = (
            (settings.TEAM_NAME, self.opponent)
            if self.is_home
            else (self.opponent, settings.TEAM_NAME)
        )
        return f"{away_team_name} at {home_team_name}"

    class Meta:
        ordering = ["-date"]


class Inning(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="innings")
    number = models.PositiveSmallIntegerField()
    top_frame = models.OneToOneField(
        "Frame", on_delete=models.CASCADE, related_name="inning_of_top"
    )
    bottom_frame = models.OneToOneField(
        "Frame", on_delete=models.CASCADE, related_name="inning_of_bottom"
    )

    class Meta:
        ordering = ["number"]


class Frame(models.Model):
    score = models.PositiveSmallIntegerField(default=0)

    @property
    def inning(self):
        return Inning.objects.get(Q(top_frame=self) | Q(bottom_frame=self))
