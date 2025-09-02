import requests
import base64
import time
from urllib.parse import urlencode


class SpotifyApi():
    def __init__(self, client_id: str, client_secret: str):
        self._client_id = client_id
        self._client_secret = client_secret
        self._token_url = "https://accounts.spotify.com/api/token"
        self._api_base_url = "https://api.spotify.com/v1"
        self._access_token = None
        self._expires_at = 0
        
    def _get_token(self):
        auth_str = f"{self._client_id}:{self._client_secret}"
        b64_auth_str = base64.b64encode(auth_str.encode()).decode()

        headers = {
            "Authorization": f"Basic {b64_auth_str}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        data = {
            "grant_type": "client_credentials"
        }

        response = requests.post(self._token_url, headers=headers, data=data)
        token_data = response.json()

        self._access_token = token_data["access_token"]
        self._expires_at = time.time() + token_data["expires_in"]

    def _get_headers(self):
        if not self._access_token or time.time() >= self._expires_at:
            self._get_token()
        return {
            "Authorization": f"Bearer {self._access_token}"
        }
    
    def get_img(self, name: str, type: str) -> str:
        params = None
        if type == "artist":
            params = {
                "q": name,
                "type": type,
                "limit": "2"

            }
        if type == "track":
            params = {
                "q": f"track:{name[0]} artist:{name[1]}",
                "type": type,
                "limit": "2"
            }


        query_string = urlencode(params)

        url = f"{self._api_base_url}/search?{query_string}"
        img_url = ""
        response = requests.get(url, headers=self._get_headers()).json()
        if type == "artist":
            img_url = response[f"{type}s"]["items"][0]["images"][0]["url"]
        elif type == "track":
            img_url = response[f"{type}s"]["items"][0]["album"]["images"][0]["url"]
            duration_of_track = response[f"{type}s"]["items"][0]["duration_ms"]
            img_url += "(!)" + str(duration_of_track)
        return img_url
        

        