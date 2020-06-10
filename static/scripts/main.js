const message_template_send = Handlebars.compile(document.querySelector("#sendingMessage").innerHTML);
const message_template_receive = Handlebars.compile(document.querySelector("#receivingMessage").innerHTML);

document.addEventListener("DOMContentLoaded", () => {

    // Connect to websocket
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

        // const userSendingMessage = message_template_send({ "messageContent": messages[0], "user": "Adi" });
        // document.querySelector("#messages").innerHTML += userSendingMessage;
        // socket.emit("send message", { "selection": messages[1] });
    }

    // When a new vote is announced, add to the unordered list
    socket.on("announce message", data => {
        const userReceivingMessage = message_template_receive({ "messageContent": messages[0], "user": "Adi" });
        document.querySelector("#messages").innerHTML += userReceivingMessage;
    });
});