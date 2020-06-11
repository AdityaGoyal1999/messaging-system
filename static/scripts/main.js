const message_template_send = Handlebars.compile(document.querySelector("#sendingMessage").innerHTML);
const message_template_receive = Handlebars.compile(document.querySelector("#receivingMessage").innerHTML);

document.addEventListener("DOMContentLoaded", () => {

    // Connect to websocket
    // window.alert(document.querySelector("#username-data").name);
    localStorage.setItem("username", document.querySelector("#username-data").name);

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Not to be pressed when not on any channel
    var channelName = '';

    socket.on('connect', () => {

        document.querySelectorAll(".messaging-channel").forEach(link => {
            link.onclick = () => {
                // clean up the page
                document.querySelector("#messages").innerHTML = "";
                document.querySelector("#message").disabled = false;
                document.querySelector("#send-button").disabled = false;
                document.querySelector("#ErrorInput").innerHTML = "";

                channelName = link.innerHTML;

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

                return false;
            };
        });
    });

    // Show the saved messages in the database
    function sendMessage(messages) {
        for (let i = 0; i < messages.length; i++) {
            if (localStorage.getItem('username') === messages[i][1]) {
                var userSendingMessage = message_template_send({ "messageContent": messages[i][0], "user": messages[i][1] });
                document.querySelector("#messages").innerHTML += userSendingMessage;
                // socket.emit("")
            } else {
                var userReceivingMessage = message_template_receive({ "messageContent": messages[i][0], "user": messages[i][1] });
                document.querySelector("#messages").innerHTML += userReceivingMessage;
            }
        }


    }

    document.querySelector("#send-button").onclick = () => {
        const messageInput = document.querySelector("#message").value;
        const userSendingMessage = message_template_send({ "messageContent": messageInput, "user": localStorage.getItem('username') });
        // Clear up the enter field
        document.querySelector("#message").value = '';
        document.querySelector("#messages").innerHTML += userSendingMessage;
        // Send information for the serve to use
        socket.emit("send message", { "selection": messageInput, "channel": channelName, "user": localStorage.getItem('username') });

        return false;
    }

    // TODO: fix the information in this
    // When a new vote is announced, add to the unordered list
    socket.on("announce message", data => {
        const userReceivingMessage = message_template_receive({ "messageContent": data.selection, "user": data.user });
        if (!(data.user === localStorage.getItem('username'))) {
            document.querySelector("#messages").innerHTML += userReceivingMessage;
        }
    });
});