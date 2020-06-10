const message_template_send = Handlebars.compile(document.querySelector("#sendingMessage").innerHTML);
const message_template_receive = Handlebars.compile(document.querySelector("#receivingMessage").innerHTML);

document.addEventListener("DOMContentLoaded", () => {

    // Connect to websocket
    // window.alert(document.querySelector("#username-data").name);
    localStorage.setItem("username", document.querySelector("#username-data").name);

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {

        document.querySelectorAll(".messaging-channel").forEach(link => {
            link.onclick = () => {
                // window.alert("link clicked");
                const channelName = link.innerHTML;

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
        // window.alert("Trying to send message");
        const userSendingMessage = message_template_send({ "messageContent": document.querySelector("#message").value, "user": localStorage.getItem('username') });
        document.querySelector("#messages").innerHTML += userSendingMessage;
        socket.emit("send message", { "selection": document.querySelector("#message").value });

        return false;
    }

    // TODO: fix the information in this
    // When a new vote is announced, add to the unordered list
    socket.on("announce message", data => {
        const userReceivingMessage = message_template_receive({ "messageContent": data.selection, "user": data.user });
        document.querySelector("#messages").innerHTML += userReceivingMessage;
    });
});