from google.cloud import storage
from flask import Flask, request, jsonify
import os
from constants import *
from flask_cors import CORS

# Set the environment variable for the Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_APPLICATION_CREDENTIALS
encoding = 'utf-8'

"""Sets up the Python server that's caled by JavaScript front-end;
the Python server itself acts as a client to the GCS server"""
def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # Allows any API call to the Flask server from any origin
    CORS(app, resources={r"/*": {"origins": "*"}})

    # retrieve the GCS blob identified in the arguments
    @app.route('/data')
    def get_gcs_data():
        blobname = request.args.get('blobname')
        blob_string = download_blob(bucket_name, blobname)
        response_body = {
            "dataset": blobname,
            "data": blob_string
        }
        # print(blobname)

        return jsonify(response_body)

    # TODO: Implement upload function to GCS
    '''@app.route('/upload')
    def upload_image():
        file = request.files.get('image')
        if not file:
            return jsonify({'error': 'Image is required'}), 400,
        tmp_file = f'/tmp/{file.filename}'
        file.save(tmp_file)
        # url = gcs_upload_file(tmp_file)
        os.remove(tmp_file)'''

    return app

def download_blob(bucket_name, source_blob_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob_bytes = blob.download_as_bytes()
    # print(blob_bytes)
    return blob_bytes.decode(encoding)

def list_blobs(bucket_name):
    """Lists all the blobs in the bucket."""
    storage_client = storage.Client()
    blobs = storage_client.list_blobs(bucket_name)

    for blob in blobs:
        print(blob.name)

'''def gcs_upload_file(bucket_name, filename: str):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename.split("/")[-1])
    blob.upload_from_filename(filename)
    # blob.make_public()
    # public_url: str = blob.public_url
    # print(f"Image uploaded to {public_url}")
    print("Image uploaded privately")
    os.remove(filename)'''

if __name__ == "__main__":
    list_blobs(bucket_name)
