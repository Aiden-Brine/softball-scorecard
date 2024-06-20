from django.db import models
from django.conf import settings


class Game(models.Model):
    opponent = models.CharField(max_length=120)
    home_team = models.BooleanField()
    date = models.DateField()
    innings = models.ForeignKey("Inning", on_delete=models.CASCADE)

    def _str_(self):
        home_team_name, away_team_name = (
            (settings.TEAM_NAME, self.opponent)
            if self.home_team
            else (self.opponent, settings.TEAM_NAME)
        )
        return f"{away_team_name} at {home_team_name}"


class Inning(models.Model):
    number = models.PositiveSmallIntegerField()
    top_frame = models.OneToOneField(
        "Frame", on_delete=models.CASCADE, related_name="top"
    )
    bottom_frame = models.OneToOneField(
        "Frame", on_delete=models.CASCADE, related_name="bottom"
    )

    class Meta:
        ordering = ["number"]


class Frame(models.Model):
    score = models.PositiveSmallIntegerField(default=0)
