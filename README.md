# Project 2

The project has a chat web application, Flack. It is a single page app that once logged in, doesn't requrie to be loaded again. The app remembers the person once logged in and even after the person has closed the browser. It even remembers the channel that the person was most recently on.

<img src="messaging.gif" alt="Project demonstration">

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

<h3>Code of conduct</h3>
Interest in contributing to the project is much appreciated and welcomed. If you would like to know more about it, contact me on my
<a href="https://www.linkedin.com/in/adi-goyal/">LinkedIn</a>

The project has a chat web application, Flack. It is a single page app that once logged in, doesn't requrie to be loaded again. The app remembers the person once logged in and even after the person has closed the browser. It even remembers the channel that the person was most recently on.

Use of Local Storage of browser - to keep username and last visited channel information.

Requirement 1: If the user logs into the web app for the first time, he will be prompted with a field to enter his/her name. The name will be stored even when the user closes thee browser window.

Requirement 2: The chat can have multiple unique channels and when a user creates one, all other users can automatically see it and send receive/send messages.

Requirement 3: The user is able to see a list of channels from the left pannel and select any one of them to interact in it.

Requirement 4: The app only stores 100 most recent messages and removes the older ones. This is consistent with the server and client side.

Requirement 5: The messages send by a user has text, username and time when the message is sent. It is saved in the specific channel that the user is on. Moreover, the user doesn't need to reload the page to view the new ones.

Requirement 6: Once the user has closed the browser window, he will be taken to the most recent channel once he comes back to the page.

Requirement 7:The user can delete the message that he once sent. The message gets deleted with a beautiful animation and it is also removed from the server.

Requirement 8: The project has a README.md (this one).

Requirement 9: No new packages where installed to be added on the requirements.txt

