from .api import SpotifyApi
from pathlib import Path
import json
import pandas as pd
from datetime import datetime
import requests
import base64

client_id = "6f9dc9391606485eb9267a46d10233e0"
client_secret = "1ddc557463c44717b94de21667049537"

class StatManager():
    def __init__(self, stats_path: Path):
        self._stats_path = stats_path
        self._df = None
        self._stats = {}
        self._spotify_api = SpotifyApi(client_id, client_secret)

    def stats(self) -> dict:
        return self._stats

    def create_dataframe(self):
        dfs = []

        for file in self._stats_path.iterdir():
            with open(file) as f:
                data = json.load(f)
            df = pd.DataFrame(data)
            dfs.append(df)

        self._df = pd.concat(dfs, ignore_index=True)
        self._df['ts'] = pd.to_datetime(self._df['ts'], utc=True)
    
    def listen_time(self):
        #----All Time Total Mins----#
        all_time_ms = self._df["ms_played"].sum() 
        all_time_min = all_time_ms / 60000

        #----Current Month----#
        now = pd.Timestamp.utcnow()
        current_year = now.year
        current_month = now.month

        df_current_month = self._df[(self._df['ts'].dt.year == current_year) & (self._df['ts'].dt.month == current_month)]
        current_month_ms = df_current_month["ms_played"].sum()
        current_month_min = current_month_ms / 60000

        #----Current Year ----#
        df_current_year = self._df[(self._df['ts'].dt.year == current_year)]
        current_year_ms = df_current_year["ms_played"].sum()
        current_year_min = current_year_ms / 60000

        self._stats["listenTime"] = {
            "currentMonth": f"{round(current_month_min):,}",
            "currentYear": f"{round(current_year_min):,}",
            "allTime": f"{round(all_time_min):,}"
        }
    def _make_data_list(self, top_artists: pd.Series) -> list[dict]:
        for artist, listen_time in top_artists.items():
            print(artist)
            print(listen_time)
     

    def top_artist(self):
        #----All Time---#
        top_artists_all_time = (
            self._df.groupby("master_metadata_album_artist_name")["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_artists_all_time_list = self._make_data_list(top_artists_all_time)
        
        


        self._stats["TopArtist"] = {
            "currentMonth": [
                {
                    "artistImg": "fdsfs",
                    "artistName": "sdfdsf",
                    "listenTime": "fdsdf"
                },
                {
                    "artistImg": "fdsfs",
                    "artistName": "sdfdsf",
                    "listenTime": "fdsdf"
                }
            ],
            "currentYear": [],
            "allTime": []
        }



        



temp_path = Path("spotify_files/Spotify Extended Streaming History")

sm = StatManager(temp_path)
sm.create_dataframe()
sm.top_artist()






