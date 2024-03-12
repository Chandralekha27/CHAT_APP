const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        chatName : { type : String, required : true},
        isGroupChat : { type : Boolean, default : false},
        users : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        ],
        latestMessage : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message"
        },
        groupAdmin : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps : true,
    }
);

const Chat = mongoose.Model("Chat", chatSchema);

module.exports = Chat;