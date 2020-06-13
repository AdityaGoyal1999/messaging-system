import os

from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

'''
Precondition: all channel keys in channels should match the names in channel_names. Also, the channels should not repeat themselves.
'''

# Contains all messages as key: name of channel, value : list of tuples that have the message information
channels = {}
# Contains all names of channels
channel_names = []


@app.route("/")
def index():
    return render_template("main.html")


# Creating a channel
@app.route("/channels", methods=["POST"])
def show_channels():
    new_name = request.form.get('newName')

    # The uniqueness of channels is already being checked in main.js
    if(new_name != ''):
        channel_names.append(new_name)
        channels[new_name] = []
    return jsonify({"channels": channel_names})


# get the messages of a specific channel
@app.route("/channel", methods=["POST", "GET"])
def channel():
    channel_name = request.form.get("channel")
    return jsonify({"channel": channels[channel_name]})


@socketio.on("send message")
def send_message(data):
    selection = data["selection"]
    if(data["channel"] != ''):
        # No more than 100 messages are stored in a channel
        if(len(channels[data["channel"]]) >= 100 ):
            channels[data["channel"]].pop(0)
        channels[data["channel"]].append((selection, data["user"], data["time"]))
        emit("announce message", {"selection": selection, "user": data["user"], "time": data["time"], "channelName": data["channelName"]}, broadcast=True)


# socket for channel creation so user doesn't need to reload the page once anyone creates a channel
@socketio.on("create channel")
def create_new_channel(data):
    selection = data["channelName"]
    channels[selection] = []
    channel_names.append(selection)
    emit("create new channel", {"channelName": selection}, broadcast=True)


# Messaege is deleted
@socketio.on("delete sender message")
def create_new_channel(data):

    deleting_value = (data["text"], data["name"], data["time"])
    if data["channel"] != '':
        if(deleting_value in channels[data["channel"]] and data["channel"] != ''):
            channels[data["channel"]].remove(deleting_value)