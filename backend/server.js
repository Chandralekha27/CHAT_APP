//import the dependency
const express = require('express'); 
// import the dummy data as chats
const { chats } = require('./data/data');


//------------WEB SOCKET---------------------
//import websocket
const ws = require('ws');

const wss = new ws.Server({port: 7071});

var connections = []

wss.on('connection',(ws)=>{
    console.log("Connected to socket");
    connections.push(ws);
    ws.on('message',(message)=>{
        console.log(message.toString());
        for(var c of connections){
            c.send("Hello " + message);
        }
    })
    ws.on ('close', ()=> {
        connections.filter((a) => { a !=ws });
    });
})

//------------WEB SOCKET---------------------

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
//---------------DATABASE----------------
const mongoose = require('mongoose');

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chat")
  .then(() => {
    console.log("Connected to database");
  });
//---------------DATABASE----------------


//---------------BODY PARSER-------------------

const bodyParser = require('body-parser');

// Set extended option explicitly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//---------------BODY PARSER-------------------

//---------------ROUTES-------------------
//import routes here
const routes = require("./routes/routes");

app.use("/api/user", routes);
//---------------ROUTES-------------------

//---------------RENDER-------------------

const path = require('path');

app.get('/dummy',(req,res) => {
    res.sendFile(path.join(__dirname,'../frontend/templates/dummy.html'))
    }
);

app.use(express.static(path.join(__dirname + '../frontend/static')));

app.get('/frontend/static/css/login.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, '../frontend/static/css/login.css'));
});

app.get('/frontend/static/js/login.js', (req, res) => {
    res.type('text/js');
    res.sendFile(path.join(__dirname, '../frontend/static/js/login.js'));
});


app.get('/api/user/login',(req,res) =>{
    res.sendFile(path.join(__dirname,'../frontend/templates/login.html'));
})

//---------------RENDER-------------------


//starting server on port given
app.listen(8080, console.log("Server started on port 8080"));