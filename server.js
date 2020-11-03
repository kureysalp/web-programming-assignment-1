const express = require('express');
const server = express();
var bodyParser = require('body-parser') // To use "req.body". Nodejs body parser bundle removed July 2020.

const port = 4000;
server.use(bodyParser.urlencoded({ extended: false }));

//#region ITEM OBJECTS
const item_1 = {
    "id": 0,
    "name": "Item 1",
    "description": "First item of this application."
}
const item_2 = {
    "id": 1,
    "name": "Item 2",
    "description": "Second item of this application."
}

const item_3 = {
    "id": 2,
    "name": "Item 3",
    "description": "Third item of this application."
}

const item_4 = {
    "id": 3,
    "name": "Item 4",
    "description": "Fourth item of this application."
}

const item_5 = {
    "id": 4,
    "name": "Item 5",
    "description": "Fifth item of this application."
}
//#endregion

//#region USERS
const user_1 = {
    "username": "kureysalp",
    "password": "Strong.password*1"
}

const user_2 = {
    "username": "weakuser",
    "password": "weakpass."
}
//#endregion

const items = [item_1, item_2, item_3, item_4, item_5];

const users = [user_1, user_2];

// Listening port at 4000.
server.listen(port, () => {
    console.log("Listening at " + port);
})

// Homepage.
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

server.get("/welcome", (req, res) => {
    res.json("I, Alp, have read the syllabus we went through in the first class. ");
})

server.get("/getItem/:input", (req, res) => {
    const userInput = req.params['input'];
    res.json([items[userInput]]);
})

server.get("/login", (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
})

server.post("/check_login", (req, res) => {
    // Get user data by form from body.
    const username = req.body.username;
    const password = req.body.password;

    console.log(username ,"tried to login with password", password);

    // Iterating every user to check informations.
    for (var i = 0; i < users.length; i++)
    {
        // Redirect the user and break the loop if login was successful.
        if(users[i].username == username && users[i].password == password)
        {
            res.redirect("/auth");
            break;
        }
        else
            res.redirect("/login"); // Redicert user back to the login if login was unsuccesfull.
    }
})

// Success login page.
server.get("/auth", (req, res) => {
    res.sendFile(__dirname + '/public/auth.html');
})