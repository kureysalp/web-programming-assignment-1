const express = require('express');
const server = express();
const fs = require('fs');
var bodyParser = require('body-parser') // To use "req.body". Nodejs body parser bundle removed July 2020.

const port = 4000;
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static('public', {
    extensions: ['html', 'htm'],
}));
server.use(express.urlencoded({ extended: false }));

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

// PRODUCT LIST
server.get("/get_products", (req, res) => {
    fs.readFile(__dirname + '/public/products.json', 'utf8', (err, data) => {
        if(err)
            console.log(err);
        else {
            var productsJson = JSON.parse(data).products; // Parse data if there is no error.
            var products = "";
            for(var i = 0; i < productsJson.length; i++)
            {
                products += "<li><a href='getItem/" + i + "'>" + productsJson[i].name + "</a></li>"
            }       
            var productsData = "<!DOCTYPE html><head><title>Products</title></head><body><p><a href='/'>Home</a></p>" +
            "<ul>" + products + "</ul>"
            +"</body></html>"

            res.send(productsData);
        }
    });
})

// GET SPECIFIC ITEM
server.get("/getItem/:input", (req, res) => {
    const userInput = req.params['input'];

    // Reading the file async.
    fs.readFile(__dirname + '/public/products.json', 'utf8', (err, data) => {
        if(err)
            console.log(err);
        else
        {
            var jsonData = JSON.parse(data).products[userInput]; // Parse data if there is no error.
            var productData = "Name: " + jsonData.name + "<br>" +
            "Price: " + jsonData.price + "<br>" +
            "Description: " + jsonData.description + "<br>";
            var productsData = "<!DOCTYPE html><head><title>Web Programming Assingment 1</title></head><body>"+
            productData + 
            "<p><a href='/get_products'>Products</a></p></body></html>";

            res.send(productsData);
        }
    });
})

// server.get("/login", (req, res) => {
//     res.sendFile(__dirname + '/public/form.html');
// })

// LOGIN
server.post("/check_login", (req, res) => {
    // Get user data by form from body.
    const username = req.body.username;
    const password = req.body.password;

    console.log(username ,"tried to login with password", password);

    // Reading the file async.
    fs.readFile(__dirname + '/public/user_credentials.json', 'utf8', (err, data) => {
        if(err)
            console.log(err);
        else {
            const jsonData = JSON.parse(data); // Parse data if there is no error.

             // Iterating every user to check informations.
            for (var i = 0; i < jsonData.users.length; i++)
            {                
                // Redirect the user and break the loop if login was successful.
                if(jsonData.users[i].username == username && jsonData.users[i].password == password)
                {
                    console.log("login success");
                    return res.redirect("/products") // Redirect user to success page.
                }
            }
            res.redirect("/login"); // Redicert user back to the login if login was unsuccesfull.
            console.log("login failed");
        }
    });
})

server.get("/register", (req, res) => {
    res.sendFile(__dirname + '/public/register.html')
})

server.post("/register_user", (req, res) => {
    const _username = req.body.username;
    const _password = req.body.password;
    const _passwordRP = req.body.passwordRP;

    fs.readFile(__dirname + '/public/user_credentials.json', 'utf8', (err, data) => {
        if(err)
            console.log(err);
        else {
            const jsonData = JSON.parse(data); // Parse data if there is no error.

            // Check passwords are match.
            if(_password != _passwordRP)
            {
                return res.redirect("/register");                
            }

            // Iterating every user to check informations.
            for (var i = 0; i < jsonData.users.length; i++) {                   
                // Redirect the user and break the loop if login was successful.
                if(jsonData.users[i].username == _username)
                    return res.redirect("/register") // Redirect user to success page.                                
            }
            jsonData.users.push({username: _username, password: _password}); // Add new user to the json.
                    var jsonString = JSON.stringify(jsonData); // Convert json to string to write it to the file.
        
                    // Write file with new user informations
                    fs.writeFile('public/user_credentials.json', jsonString, 'utf8', (err) => {                
                        if(!err)
                        {
                            console.log("Register success.");
                            return res.redirect('/login');
                        }
                    });
        }                                
    });
})

// Success login page.
server.get("/auth", (req, res) => {
    res.sendFile(__dirname + '/public/auth.html');
})