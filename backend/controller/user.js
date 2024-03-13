const User = require('../model/userModel')

const getUserByName = (req, res, next, username) => {
    console.log("Adding username to request");
    req.username = username;
    next();
}

const getUser = async (req, res) =>{
    console.log("Getting user by name "+req.username);
    try {
        const user = await User.find({name : req.username}).exec();
        if(user.length == 1){
            console.log("in the loohdjsbna")
            return res.status(200).json(user);
        }
        return res.status(404).json({error : " User not found"});
    }catch(err){
        return res.status(500);
    }
}

const registerUser = async (req, res) =>{
    console.log("Register a user from register page");
    try{
        console.log("In the try block of register user");
        console.log(req.body)
        //creating new user
        const newUser = new User({
            name  : req.body.name,
            email  : req.body.email,
            password : req.body.password
        })
        console.log("finished initialising the user")
        try{
            const user = await newUser.save();
            console.log("finished saving user")
            res.status(200).send(user);
        }
        catch(error){
            if(error.code == 11000){
                console.log("User already exists so send bad request");
                res.status(400).json({error : "User already exists with given name"})
            }else {
                console.log(error)
                res.status(500);
            }
        }
    }catch(error){
        res.status(500);
    }
}


const loginUser = async (req, res) =>{
    console.log("Login a user via login page");
    try { 
        const user = await User.find({name : req.body.name}).exec();
        if(user.length != 1){
            console.log("User doesn't exist");
            res.status(400).json({error : "User doesn't exist"});
            console.log("redirect to regiter page with prefilled details");  
        }     
        console.log("Validate user with name and passowrd details") 
        res.status(200).json(user);
        console.log("redirect to all chats page");
    }catch(error){
        res.status(500);
    }
}

const sayHello = (req,res) =>{
    console.log("Dummy method to enable routing");
    return res.status(200).json({hi : 200});
}

module.exports =  { getUserByName, getUser, sayHello, registerUser , loginUser};