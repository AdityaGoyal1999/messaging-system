import os

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = []

@app.route("/")
def index():
    return render_template("index.html", title="Welcome")


@app.route("/login", methods=["POST"])
def login():

    username = request.form.get("username")
    password = request.form.get('password')

    for i in range(1, 31):
        channels.append(f"Channel #{i}")

    return render_template("main.html", channels=channels)


@app.route("/message", methods=["POST"])
def message():

    message = request.form.get('message')

    return message