from .api import SpotifyApi
from pathlib import Path
import json
import pandas as pd
from datetime import datetime
import requests
import base64
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API credentials from environment variables
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

class StatManager():
    def __init__(self, stats_path: Path):
        self._stats_path = stats_path
        self._df = None
        self._df_curr_month = None
        self._df_curr_year = None
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

        now = pd.Timestamp.utcnow()
        current_year = now.year
        current_month = now.month

        self._df_curr_month = self._df[(self._df['ts'].dt.year == current_year) & (self._df['ts'].dt.month == current_month)]
        self._df_curr_year = self._df[(self._df['ts'].dt.year == current_year)]
    
    def listen_time(self):
        #----All Time Total Mins----#
        all_time_ms = self._df["ms_played"].sum() 
        all_time_min = all_time_ms / 60000

        current_month_ms = self._df_curr_month["ms_played"].sum()
        current_month_min = current_month_ms / 60000

        #----Current Year ----#
        current_year_ms = self._df_curr_year["ms_played"].sum()
        current_year_min = current_year_ms / 60000

        self._stats["listenTime"] = {
            "currentMonth": f"{round(current_month_min):,}",
            "currentYear": f"{round(current_year_min):,}",
            "allTime": f"{round(all_time_min):,}"
        }

    def _make_data_list(self, top_data: pd.Series, type: str) -> list[dict]:
        data_list = []
        times_played = 0
        for data, listen_time in top_data.items():
            listen_time_min = round(listen_time / 60000)
            img_url = self._spotify_api.get_img(data, type)
            if type == "track":
                temp = img_url.split("(!)")
                img_url = temp[0]
                duration_min = round(int(temp[1]) / 60000, 2)
                times_played = round(listen_time_min / duration_min)
            data_dict = {
                "img": img_url,
                "name": data if isinstance(data, str) else data[0],
                "listenTime": f"{listen_time_min:,}",
                "timesPlayed": f"{times_played:,}"
            }
            data_list.append(data_dict)
        return data_list
            
     

    def top_artist(self):
        #----All Time---#
        top_artists_all_time = (
            self._df.groupby("master_metadata_album_artist_name")["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_artists_all_time_list = self._make_data_list(top_artists_all_time, "artist")
        
        #----Current Month----#
        top_artists_curr_month = (
            self._df_curr_month.groupby("master_metadata_album_artist_name")["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_artists_curr_month_list = self._make_data_list(top_artists_curr_month, "artist")


        #----Current Year----#
        top_artists_curr_year = (
            self._df_curr_year.groupby("master_metadata_album_artist_name")["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_artists_curr_year_list = self._make_data_list(top_artists_curr_year, "artist")


        self._stats["topArtist"] = {
            "currentMonth": top_artists_curr_month_list,
            "currentYear": top_artists_curr_year_list,
            "allTime": top_artists_all_time_list
        }

    def top_song(self):
        #----All Time ----#
        top_songs_all_time = (
            self._df.groupby(["master_metadata_track_name", "master_metadata_album_artist_name"])["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_songs_all_time_list = self._make_data_list(top_songs_all_time, "track")

         #----Current Month----#
        top_songs_curr_month = (
            self._df_curr_month.groupby(["master_metadata_track_name", "master_metadata_album_artist_name"])["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_songs_curr_month_list = self._make_data_list(top_songs_curr_month, "track")


        #----Current Year----#
        top_songs_curr_year = (
            self._df_curr_year.groupby(["master_metadata_track_name", "master_metadata_album_artist_name"])["ms_played"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
        )
        top_songs_curr_year_list = self._make_data_list(top_songs_curr_year, "track")

        self._stats["topSong"] = {
            "currentMonth": top_songs_curr_month_list,
            "currentYear": top_songs_curr_year_list,
            "allTime": top_songs_all_time_list
        }



        



temp_path = Path("spotify_files/Spotify Extended Streaming History")

sm = StatManager(temp_path)
sm.create_dataframe()
sm.top_song()






