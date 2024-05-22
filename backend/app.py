from google.cloud import storage
from flask import Flask, request, jsonify
import os
from constants import *

# Set the environment variable for the Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_APPLICATION_CREDENTIALS
bucket_name = bucket_name

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/data')
    def getData():
        blobname = request.args.get('blobname')
        download_blob(bucket_name, blobname, "destination.csv")
        return 'Check destination.csv!'
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



def list_blobs(bucket_name):
    """Lists all the blobs in the bucket."""
    storage_client = storage.Client()
    blobs = storage_client.list_blobs(bucket_name)

    for blob in blobs:
        print(blob.name)

def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    # blob.download_to_filename(destination_file_name)
    # print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")
    return blob.download_as_string()


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

# Replace 'your-bucket-name' with your bucket name

if __name__ == "__main__":
    list_blobs(bucket_name)
    # download_blob(bucket_name, 'raw/state_climate_data.csv', 'destination.csv')
    # download_blob(bucket_name, 'your-source-blob-name', 'local-destination-file.txt')
