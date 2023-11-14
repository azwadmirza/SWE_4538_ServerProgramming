const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    images: {
        type: [String],
        default: [],
    },
    audio: {
        type: [String],
        default: [],
    }
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;