const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const cors = require("cors");

app.use(express.static("public"));
app.use(cors());

const clients = [];
const history = [];

app.ws("/board", (ws, req) => {
    clients.push(ws);
    ws.on("message", (msg) => {
        //if type = chat, push to chat array

        history.push(msg);
        console.log(msg);
        for (const ws of clients) {
            ws.send(msg);
        }
    });
});

app.get("/history", (req, res) => {
    res.json(history);
});

app.listen(3008);

module.exports = app;
