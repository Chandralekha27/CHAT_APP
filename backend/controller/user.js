const User = require('../model/userModel')

const getUserByName = (req, res, next, username) => {
    console.log("Adding username to request");
    req.username = username;
    next();
    
}

const getUser = (req, res) =>{
    console.log("Getting user by name "+req.username);
    //return res.status(200).json({ username : req.username})
    User.findByName(req.username, (err,data)=>{
        if(err || !data){
            return res.status(404).json({ error: "Notfound" });
        }
        console.log("I am there");
        req.data = data;
    });
}

const sayHello = (req,res) =>{
    console.log("Dummy method to enable routing");
    return res.status(200).json({hi : 200});
}

module.exports =  { getUserByName, getUser, sayHello };