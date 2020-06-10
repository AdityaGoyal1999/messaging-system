// window.alert("Connected");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".messaging-channel").forEach(link => {
        link.onclick = () => {
            // window.alert("link clicked");
            const channelName = link.innerHTML;
            var request = new XMLHttpRequest();
            request.open("POST", "/channel");

            request.onload = () => {
                const response = JSON.parse(request.responseText);
                const messages = response.channel;
                window.alert("Works");
                console.log("This is working");
            };

            const data = new FormData();
            data.append('channel', channelName);
            request.send(data);
        };
    });
    // document.querySelector(".messaging-channel").onclick = () => {
    //     const channelName = document.querySelector("#channel").innerHTML;
    //     var request = new XMLHttpRequest();
    //     request.open("POST", "/channel");
    //     window.alert(`${channelName}`);

    //     const data = new FormData();
    //     data.append('channel', channelName);
    //     request.send(data);

    //     document.querySelector("#checker").innerHTML = channelName;

    //     request.onload = () => {
    //         const response = JSON.parse(request.responseText);
    //         const messages = response.channel;
    //         window.alert("Wroks");
    //         console.log("This is working");
    //     };
    // };

});