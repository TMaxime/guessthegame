// Imports
const express = require('express')
const app = express()
const port = 5000
const highscore = require("./highscore.js");

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/html/index.html");
});

app.get("/recipe-game", (req, res) => {
    res.sendFile(__dirname + "/static/html/recipe-game.html");
});

app.get("/movie-game", (req, res) => {
    res.sendFile(__dirname + "/static/html/recipe-game.html");
});

app.get("/highscore.html", (req, res) => {
    let score = req.query.score;
    let game = req.query.gametype;
    let username = req.query.username;

    highscore.appendHighscore(username, game, score);
    res.sendFile(__dirname + "/static/html/highscore.html");
});

app.get("/global_highscore.html", (req, res) => {
    res.sendFile(__dirname + "/static/html/global_highscore.html");
});

app.listen(port, () => console.info(`App listening http://localhost:${port}`));