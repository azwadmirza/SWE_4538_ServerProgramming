const mongoose = require("mongoose");

const HobbySchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    title:{
        type:String
    }
});

const Hobby = mongoose.model("Hobby", HobbySchema);
module.exports = Hobby;