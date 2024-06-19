const express = require("express");

const app = express();
const port = 3005;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// Rest API:
app.use(express.json());

const changuitos = [
    { id: 1, name: "Changuito 1" },
    { id: 2, name: "Changuito 2" },
    { id: 3, name: "Changuito 3" },
];

app.get("/changuitos", (req, res) => {
    res.json(changuitos);
});

app.get("/changuitos/:id", (req, res) => {
    const changuito = changuitos.find((c) => c.id === +req.params["id"]);
    if (!changuito) {
        res.status(404).send("Changuito not found");
    } else {
        res.json(changuito);
    }
});

app.post("/changuitos", (req, res) => {
    changuitos.push(req.body);
    res.json(req.body);
});

app.put("/changuitos/:id", (req, res) => {
    const changuito = changuitos.find((c) => c.id === +req.params["id"]);
    if (!changuito) {
        res.status(404).send("Changuito not found");
    } else {
        changuito.name = req.body.name;
        res.json(changuito);
    }
});
