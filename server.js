const express = require('express');
const server = express();

const port = 4000;

// Listening port at 4000.
server.listen(port, () => {
    console.log("Listening at " + port);
})

server.get("/json", (req, res) => {
    res.json("Hello World");
})

server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.get("/welcome", (req, res) => {
    res.json("I, Alp, have read the syllabus we went through in the first class. ");    
})