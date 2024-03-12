//import the dependency
const express = require('express'); 
// import the dummy data as chats
const { chats } = require('./data/data');

//import websocket
const ws = require('ws');

const wss = new ws.Server({port: 7071});

wss.on('connection',()=>{
    console.log("Connected to socket")
})

//create the web server
const app = express();

//first api to just see something on the browser
app.get("/", (req, res) =>{
    res.send("Hi there!!");
});

// basic api to test the chat application
app.get("/api/chat", (req, res)=> {
    res.send(chats);
});

// basic api to test filter the chats based on id in req
app.get("/api/chat/:id", (req, res) => {
    console.log(req.params.id);
    const chat = chats.find((c) => c._id === req.params.id);
    res.send(chat);
});

//starting server on port given
app.listen(8080, console.log("Server started on port 8080"));