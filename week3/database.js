const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect("mongodb+srv://admin:Waheguru%40123@lakshya.wflcrjo.mongodb.net/userappnew")

const User = mongoose.model('Users', { name: String, email: String, password: String});

// const user = new User({
//     email: "lakhwinder.code@gmail.com",
//     password: "123",
//     name: "Lakhwinder Singh"
// });
// user.save();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({email: username});
  
    if(existingUser){
        return res.status(403).json({
            msg: "User already exists.",
            user: existingUser
        })
    }
    const user  = new User(
        {
            email: username,
            password: password,
            name: name
        }
    )
    user.save();
    res.json({
        msg: "User created successfully."
    })
    
})

app.listen("3000", ()=> {
    console.log('server is running')
})

