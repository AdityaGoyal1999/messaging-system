// Handlebar templates
const message_template_send = Handlebars.compile(document.querySelector("#sendingMessage").innerHTML);
const message_template_receive = Handlebars.compile(document.querySelector("#receivingMessage").innerHTML);
const channelLink = Handlebars.compile(document.querySelector("#channelLinks").innerHTML);

document.addEventListener("DOMContentLoaded", () => {

    // check if channel exists in local Storage
    if ("channel" in localStorage) {
        if (localStorage.getItem('channel') != null) {
            load_all_messages(localStorage.getItem('channel'))
        }
    }

    // check if username correctly exists in local Storage
    if (!("username" in localStorage)) {
        var val = window.prompt("Enter you unique name");
        window.alert("Welcome " + val);
        localStorage.setItem("username", val);
    } else if (localStorage.getItem("username") == null) {
        var val = window.prompt("Enter you unique name");
        window.alert("Welcome " + val);
        localStorage.setItem("username", val);
    }

    load_channels("");

    // current channel
    var channelName = '';

    var allChannelNames;

    // setup socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    function load_new_channel(new_channel) {
        createChannel(new_channel)
        socket.emit("create channel", { "channelName": new_channel });
    }

    socket.on("create new channel", data => {
        createChannel(data.channelName);
    });

    document.addEventListener('click', event => {
        const element = event.target;
        if (element.className === 'delete') {
            element.parentElement.style.animationPlayState = 'running';
            element.parentElement.addEventListener('animationend', () => {
                // Delete from the server
                delete_message(element.parentElement);
                element.parentElement.remove();
            });
        };
    });

    function delete_message(element) {
        const name = element.querySelector("#senderName").innerHTML;
        const text = element.querySelector("#sendingMessageText").innerHTML;
        const time = element.querySelector("#time").innerHTML;
        socket.emit("delete sender message", { "name": name, "text": text, "time": time, "channel": channelName });
    }

    // Get channel list
    function load_channels(newName) {
        document.querySelector(".add-channels").innerHTML = "";

        var channelRequest = new XMLHttpRequest();
        channelRequest.open("POST", "/channels");

        channelRequest.onload = () => {
            var channelResponse = JSON.parse(channelRequest.responseText);
            var allChannels = channelResponse.channels;
            allChannelNames = allChannels;
            allChannels.forEach(createChannel);
        };
        var channelDataSend = new FormData();
        channelDataSend.append('newName', newName);
        channelRequest.send(channelDataSend);

        return false;
    }

    // fixes the scroller for messages
    function fixScroller() {
        var messageBody = document.querySelector(".message-scrollbar");
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }

    function createChannel(name) {
        const createdLink = channelLink({ "channel": name });
        document.querySelector(".add-channels").innerHTML += createdLink;
    }


    socket.on('connect', () => {
        document.querySelectorAll(".messaging-channel").forEach(link => {
            link.onclick = () => {
                // window.alert(link.name)
                load_all_messages(link.name);
                return false;
            };
        });
    });

    // loads the messages of the channel
    function load_all_messages(linkname) {
        document.querySelector("#messages").innerHTML = "";
        document.querySelector("#message").disabled = false;
        document.querySelector("#send-button").disabled = false;
        document.querySelector("#ErrorInput").innerHTML = "";

        channelName = linkname;
        localStorage.setItem("channel", linkname);

        document.querySelector("#messageHeading").innerHTML = channelName;

        var request = new XMLHttpRequest();
        request.open("POST", "/channel");

        request.onload = () => {
            const response = JSON.parse(request.responseText);
            const messages = response.channel;
            sendMessage(messages);
        };

        const data = new FormData();
        data.append('channel', channelName);
        request.send(data);
    }

    // Show the saved messages in the database
    function sendMessage(messages) {
        for (let i = 0; i < messages.length; i++) {
            if (localStorage.getItem('username') === messages[i][1]) {
                var userSendingMessage = message_template_send({ "messageContent": messages[i][0], "user": messages[i][1], "time": messages[i][2] });
                document.querySelector("#messages").innerHTML += userSendingMessage;
            } else {
                var userReceivingMessage = message_template_receive({ "messageContent": messages[i][0], "user": messages[i][1], "time": messages[i][2] });
                document.querySelector("#messages").innerHTML += userReceivingMessage;
            }
            fixScroller();
        }

    }

    document.querySelector("#button-create-channel").onclick = () => {
        const newChannelName = document.querySelector("#createNewChannelName").value;
        if (allChannelNames.includes(newChannelName)) {
            window.alert("This channel name already exists");
        } else {
            load_new_channel(newChannelName);
        }
    };

    document.querySelector("#send-button").onclick = () => {
        var today = new Date();
        var mins = today.getMinutes();
        var hours = today.getHours();
        if (mins <= 9) {
            mins = "0" + mins.toString();
        }
        var time = hours.toString() + ":" + mins.toString();
        const messageInput = document.querySelector("#message").value;
        const userSendingMessage = message_template_send({ "messageContent": messageInput, "user": localStorage.getItem('username'), "time": time });
        // Clear up the enter field
        document.querySelector("#message").value = '';
        document.querySelector("#messages").innerHTML += userSendingMessage;
        fixScroller();

        // Send information for the serve to use
        socket.emit("send message", { "selection": messageInput, "channel": channelName, "user": localStorage.getItem('username'), "time": time, "channelName": channelName });

        return false;
    }

    socket.on("announce message", data => {

        if (channelName === data.channelName) {
            const userReceivingMessage = message_template_receive({ "messageContent": data.selection, "user": data.user, "time": data.time });
            if (!(data.user === localStorage.getItem('username'))) {
                document.querySelector("#messages").innerHTML += userReceivingMessage;
                fixScroller();
            }
        }
    });

});