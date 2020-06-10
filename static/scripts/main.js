const message_template = Handlebars.compile(document.querySelector("#sendingMessage").innerHTML);

document.addEventListener("DOMContentLoaded", () => {
    // document.querySelector("#checkingMessage").value = "Nice";

    // const message_template = handlebars.compile(document.querySelector("#sendingMessage").innerHTML);

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
                // document.querySelector("#checkingMessage").value = "Nice";
                // window.alert(messages);
                // // console.log("This is working");

                // document.querySelector("#checker").innerHTML = messages[1];
                sendMessage(messages);
            };

            const data = new FormData();
            data.append('channel', channelName);
            request.send(data);

            return false;
        };
    });


    function sendMessage(messages) {
        const userSendingMessage = message_template({ "messageContent": messages[0] });
        document.querySelector("#messageBox").innerHTML += userSendingMessage;

    }
});