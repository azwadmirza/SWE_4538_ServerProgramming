const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    projects:{
        title:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        }
    }

});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;