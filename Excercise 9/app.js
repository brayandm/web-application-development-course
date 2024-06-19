const express = require("express");
const cors = require("cors");

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

app.use(cors());

const posts = [
    {
        title: "REST API",
        body: "REST is an acronym for REpresentational State Transfer",
    },
    {
        title: "JavaScript",
        body: "Here we learn JavaScript, starting from scratch",
    },
];

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:postId", (req, res) => {
    res.json(posts[+req.params["postId"]]);
});

app.post("/posts", (req, res) => {
    const postId = posts.push(req.body) - 1;
    res.json({ postId });
});

app.put("/posts/:postId", (req, res) => {
    posts[+req.params["postId"]] = req.body;
    res.json(req.body);
});
