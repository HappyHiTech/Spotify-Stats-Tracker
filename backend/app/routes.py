from flask import Flask, request, Response, Blueprint, jsonify
from .file_manager import FileManager
from .stat_manager import StatManager
main = Blueprint('main', __name__)

#----------Routes----------#
@main.route('/api/message')
def temp():
    print("\n\n\n\n\nffdshello")
    return Response("OK", status=200)


@main.route('/api/file_data', methods=["POST"])
def file_data():
    spotify_data_zip = request.files['file']
    spotify_data_manager = FileManager(spotify_data_zip)
    
    # Extract and process files in memory
    json_data = spotify_data_manager.extract_in_memory()
    
    # Create stat manager with the in-memory data
    stat_manager = StatManager(json_data)
    
    stat_manager.create_dataframe()
    stat_manager.listen_time()
    stat_manager.top_artist()
    stat_manager.top_song()
    
    return jsonify(stat_manager.stats())