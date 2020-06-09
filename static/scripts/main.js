// window.alert("Connected");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".messaging-channel").onclick = () => {
        const channelName = document.querySelector(".messaging-channel").innerHTML;
        var request = new XMLHttpRequest();
        request.open("POST", "/channel");
        // TODO: All links are not working
        window.alert("works");
        request.onload = () => {
            const response = JSON.parse(request.responseText);
            const messages = response.channel;
            window.alert(`${messages} are the messages.`);
        };
        // const data = new FormData();
        // data.append('channel', channelName);

        // // Send request.
        // request.send(data);
    };
});