let username = localStorage.getItem("username");
while (!username) {
    username = prompt("What is your name?");
}
localStorage.setItem("username", username);

// get board history
fetch("http://95.85.52.6:9055/history")
    .then((response) => response.json())
    .then((data) => {
        for (const message of data) {
            receiveMessage(message);
        }
    });

// WebSocket connection setup
let ws;
connectWs();

function connectWs() {
    // Establish the WebSocket connection and set up event handlers
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    ws = new WebSocket(`${protocol}://95.85.52.6:9055/board`);
    ws.onmessage = (message) => receiveMessage(message.data);
    ws.onclose = () => connectWs();
}

function sendMessage(message) {
    ws.send(JSON.stringify(message));
}

function receiveMessage(message) {
    message = JSON.parse(message);
    const data = message.data;
    switch (message.type) {
        case "drawing":
            context.beginPath();
            context.strokeStyle = data.color;
            context.moveTo(...data.start);
            context.lineTo(...data.end);
            context.stroke();
            break;
        case "cursor":
            if (data.username === username) break;
            let element = cursorElements[data.username];
            if (!element) {
                element = document.createElement("div");
                element.classList.add("cursor");
                element.innerText = data.username;
                document.body.appendChild(element);
                cursorElements[data.username] = element;
            }
            element.style.left = data.position[0] + "px";
            element.style.top = data.position[1] + "px";
            break;
        case "history":
            if (data.action === "clear") {
                context.clearRect(-1, -1, 1000, 1000);
            }
            break;
        case "chat":
            const chat = document.getElementById("chat");
            chat.value = chat.value + `${data.username}: ${data.message}\n`;
            break;
    }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");

let color = colorPicker.value;
let isMouseDown = false;
let prevEvent;
colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
});

document.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    prevEvent = event;
});
document.addEventListener("mouseup", () => {
    isMouseDown = false;
    prevEvent = null;
});
canvas.addEventListener("mouseout", () => {
    prevEvent = null;
});
canvas.addEventListener("mouseenter", (event) => {
    prevEvent = event;
});
canvas.addEventListener("mousemove", (event) => {
    if (isMouseDown) {
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(prevEvent.offsetX, prevEvent.offsetY);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();

        const message = {
            type: "drawing",
            data: {
                figure: "line",
                start: [prevEvent.offsetX, prevEvent.offsetY],
                end: [event.offsetX, event.offsetY],
                color: color,
            },
        };
        sendMessage(message);
        prevEvent = event;
    }
});

const button = document.getElementById("send");

button.addEventListener("click", () => {
    const message = {
        type: "chat",
        data: {
            username: username,
            message: document.getElementById("message").value,
        },
    };
    sendMessage(message);
});

document.addEventListener("mousemove", (event) => {
    sendMessage({
        type: "cursor",
        data: {
            username: username,
            position: [event.pageX, event.pageY],
        },
    });
});

const cursorElements = {};

const clearHistoryButton = document.getElementById("clearHistory");
clearHistoryButton.addEventListener("click", () => {
    fetch("/history", {
        method: "DELETE",
    }).then((response) => console.log(response));
});
