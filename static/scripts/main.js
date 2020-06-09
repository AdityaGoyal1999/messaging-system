// window.alert("Connected");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".messaging-channel").onclick = () => {
        window.alert(`${document.querySelector(".messaging-channel").value} is clicked.`)
    };
});