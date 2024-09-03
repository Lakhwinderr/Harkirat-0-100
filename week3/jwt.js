const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = '12345';

const app = express();

const ALL_USERS = [
    {
        username: "lakhwinder.code@gmail.com",
        password: "123",
        name: "Lakhwinder Singh"
    },

    {
        username: "parindd@gmail.com",
        password: "1234", 
        name: "Parindd"
    },

    {
        username: "lakhveer@gmail.com",
        password: "12345",
        name: "Lakhveer"
    }
]


function userExists(username, password){
    
    for(const user of ALL_USERS){
        if(user.username === username && user.password === password){
            return true;
        }
    }
    return false;
}

app.use(express.json())

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "User doesn't exist in our memory."
        })
    }
    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token
    })
})


app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

        const otherUsers = ALL_USERS.filter(user => user.username !== username);
        res.status(200).json({
            otherUsers
        })
    } catch (error) {
        res.status(403).json({
            msg: "Invalid token"
        })
    }
})


app.listen("3000", () => {
    console.log("server is running.")
})