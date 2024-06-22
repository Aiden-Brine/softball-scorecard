from django.contrib import admin
from games.models import Game, Inning, Frame


class GameAdmin(admin.ModelAdmin):
    list_display = ("opponent", "is_home", "date")


class InningAdmin(admin.ModelAdmin):
    list_display = ("game", "number", "top_frame", "bottom_frame")


class FrameAdmin(admin.ModelAdmin):
    list_display = ("score",)


admin.site.register(Game, GameAdmin)
admin.site.register(Inning, InningAdmin)
admin.site.register(Frame, FrameAdmin)
