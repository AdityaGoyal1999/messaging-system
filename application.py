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

    return render_template("main.html", username=username)


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

@app.route("/channels", methods=["POST"])
def show_channels():
    new_name = request.form.get('newName')
    print(new_name, "\n\n")
    # TODO: check if channel is unique
    if(new_name != ''):
        channel_names.append(new_name)
        channels[new_name] = []
    return jsonify({"channels": channel_names})

@app.route("/channel", methods=["POST", "GET"])
def channel():
    channel_name = request.form.get("channel")
    return jsonify({"channel": channels[channel_name]})


@socketio.on("send message")
def send_message(data):
    selection = data["selection"]
    channels[data["channel"]].append((selection, data["user"], data["time"]))
    emit("announce message", {"selection": selection, "user": data["user"], "time": data["time"], "channelName": data["channelName"]}, broadcast=True)
