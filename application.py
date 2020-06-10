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
    print(f"{channels[channel_name]}\n\n")
    return jsonify({"channel": [("Lorem af;kjfa;ksdl a;fjal; ajksd;lfjha sfdhakj fjdkshf s fkdhfor firalhdfjkh akldjhflksf;jl;jas;dlkfja;ldkfja;lsfj f f f f f f f f  f f f f ff f  ff  f ahjfdljahfdjsdhfkjsf sdhfk", 'Adi'), ("Ipsum", "Cool"), ("Yadi-yadi-yada", "John")]})


@socketio.on("send message")
def send_message(data):
    print("Writing\n\n")
    print(data)
    selection = data["selection"]
    emit("announce message", {"selection": selection}, broadcast=True)
