from pathlib import Path
import zipfile
import io

class FileManager():
    def __init__(self, zipped_file):
        self._zipped_file = zipped_file

    def extract(self, file_path: Path) -> None:
        file_bytes = self._zipped_file.read()
        file_like_object = io.BytesIO(file_bytes)

        with zipfile.ZipFile(file_like_object) as zip_ref:
            zip_ref.extractall(file_path)

        read_me_path = file_path / "Spotify Extended Streaming History" / "ReadMeFirst_ExtendedStreamingHistory.pdf"
        video_path = file_path / "Spotify Extended Streaming History" / "Streaming_History_Video_2022-2025.json"
        read_me_path.unlink()
        video_path.unlink()
