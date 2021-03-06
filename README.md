# Flack Messaging Application

The project has a chat web application, Flack. It is a single page app that once logged in, doesn't requrie to be loaded again. The app remembers the person once logged in and even after the person has closed the browser. It even remembers the channel that the person was most recently on. 

The app is carefully created in order to be supported by all major browsers in the market. Security for the app is also ensured by using a separate server side and client side approach.

<img src="messaging.gif" width="700px" alt="Project demonstration">

Use of Local Storage of browser - to keep username and last visited channel information.

Languages and frameworks used:
- Flask/python: for server side processing.
- HTML: Structure of the page.
- JavaScript: Client side processing of the web app.
- SCSS, CSS: Styling of the page.
- Bootstrap: Assisting with the styling of the page.

Note for developers: The documentation is well commented and code repetition has been minimized.


<h3>🚀Quickstart</h3>

Download the dependencies<br>

```
pip install -r requirements.txt
```

<h3>📈Running app</h3>

```
export FLASK_APP=application.py
flask run
```

<h3>⚠️Information on Project</h3>

The project has a chat web application, Flack. It is a single page app that once logged in, doesn't requrie to be loaded again. The app remembers the person once logged in and even after the person has closed the browser. It even remembers the channel that the person was most recently on.

Use of Local Storage of browser - to keep username and last visited channel information.

- If the user logs into the web app for the first time, he will be prompted with a field to enter his/her name. The name will be stored even when the user closes thee browser window.

- The chat can have multiple unique channels and when a user creates one, all other users can automatically see it and send receive/send messages.

- The user is able to see a list of channels from the left pannel and select any one of them to interact in it.

- The app only stores 100 most recent messages and removes the older ones. This is consistent with the server and client side.

- The messages send by a user has text, username and time when the message is sent. It is saved in the specific channel that the user is on. Moreover, the user doesn't need to reload the page to view the new ones.

- Once the user has closed the browser window, he will be taken to the most recent channel once he comes back to the page.

- The user can delete the message that he once sent. The message gets deleted with a beautiful animation and it is also removed from the server.

- The project has a README.md (this one).

- No new packages where installed to be added on the requirements.txt

<h3>Code of conduct</h3>
Interest in contributing to the project is much appreciated and welcomed. If you would like to know more about it, contact me on my
<a href="https://www.linkedin.com/in/adi-goyal/">LinkedIn</a>