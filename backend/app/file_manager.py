from pathlib import Path
import zipfile
import io
import json

class FileManager():
    def __init__(self, zipped_file):
        self._zipped_file = zipped_file
        self._json_data = []

    def extract_in_memory(self) -> list:
        """Extract and process JSON files in memory without saving to disk"""
        file_bytes = self._zipped_file.read()
        file_like_object = io.BytesIO(file_bytes)

        with zipfile.ZipFile(file_like_object) as zip_ref:
            # Get list of files in the zip
            file_list = zip_ref.namelist()
            
            # Process only the audio streaming history JSON files
            for file_name in file_list:
                if (file_name.endswith('.json') and 
                    'Streaming_History_Audio' in file_name and
                    'ReadMeFirst' not in file_name and
                    'Video' not in file_name):
                    
                    # Read the JSON file content
                    with zip_ref.open(file_name) as json_file:
                        json_content = json_file.read().decode('utf-8')
                        data = json.loads(json_content)
                        self._json_data.extend(data)
        
        return self._json_data

    def get_data(self) -> list:
        """Return the extracted JSON data"""
        return self._json_data
