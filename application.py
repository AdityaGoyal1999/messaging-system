import os

from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = {}
channel_names = []

@app.route("/")
def index():
    return render_template("index.html", title="Welcome")


@app.route("/login", methods=["POST", "GET"])
def login():

    username = request.form.get("username")
    password = request.form.get('password')

    for i in range(1, 31):
        if f"Channel #{i}" not in channel_names:
            channel_names.append(f"Channel #{i}")
            channels[f"Channel #{i}"] = []

    # print(channels)
    return render_template("main.html", channels=channel_names, username=username)


@app.route("/message", methods=["POST"])
def message():

    message = request.form.get('message')

    return message


@app.route("/createChannel", methods=["POST", "GET"])
def create_channel():

    new_channel = request.form.get('newChannelName')
    if(new_channel not in channel_names):
        channel_names.append(new_channel)
        channels[new_channel] = []
        print(channel_names)
        # TODO: might not be the right thing to do.
        return render_template("main.html", channels=channel_names)
    else:
        return "Wait"

@app.route("/channel", methods=["POST", "GET"])
def channel():
    channel_name = request.form.get("channel")
    return jsonify({"channel": channels[channel_name]})


@socketio.on("send message")
def send_message(data):
    selection = data["selection"]
    channels[data["channel"]].append((selection, data["user"]))
    emit("announce message", {"selection": selection, "user": "Someone"}, broadcast=True)
