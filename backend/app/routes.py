from flask import Flask, request, Response, Blueprint, jsonify
from .file_manager import FileManager
from .stat_manager import StatManager 
from pathlib import Path
main = Blueprint('main', __name__)

FILE_PATH = Path("./spotify_files")
temp_path = Path("spotify_files/Spotify Extended Streaming History")



#----------Routes----------#
@main.route('/api/message')
def temp():
    print("\n\n\n\n\nffdshello")
    return Response("OK", status=200)


@main.route('/api/file_data', methods=["POST"])
def file_data():
    spotify_data_zip = request.files['file']
    spotify_data_manager = FileManager(spotify_data_zip)
    spotify_data_manager.extract(FILE_PATH)
    stat_manager = StatManager(temp_path)
    stat_manager.create_dataframe()
    stat_manager.listen_time()


    print(stat_manager.stats())
    return jsonify(stat_manager.stats())