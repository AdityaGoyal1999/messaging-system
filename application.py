import os

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = {}
channel_names = []

@app.route("/")
def index():
    return render_template("index.html", title="Welcome")


@app.route("/login", methods=["POST"])
def login():

    username = request.form.get("username")
    password = request.form.get('password')

    for i in range(1, 31):
        channel_names.append(f"Channel #{i}")
        channels[f"Channel #{i}"] = []

    # print(channels)
    return render_template("main.html", channels=channel_names)


@app.route("/message", methods=["POST"])
def message():

    message = request.form.get('message')

    return message


@app.route("/channel", methods=["POST", "GET"])
def channel():
    print("Working python\n\n")
    return jsonify({"channel": "Working"})