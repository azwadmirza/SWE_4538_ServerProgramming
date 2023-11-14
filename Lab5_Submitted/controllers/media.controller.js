const path = require('path');
const User = require("../models/User.model");
const Project = require("../models/Project.model");
const getMultipleImages = async (req, res) => {
  try {
    const userId = req.user.id
    const project = await Project.findOne({ user_id: userId });
    const images = project.images

    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const postMultipleAudioFiles = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file provided' });
    }
    const userId = req.user.id
    if (!userId) {
      return res.status(400).json({ message: 'Must be logged in' });
    }
    const audio = req.files.map((file) => file.filename);
    const project = await Project.findById(req.params.id);

    if (audio) {
      audio.forEach(element => {
        project.audio.push(element);
      });
    }
    await project.save();

    res.json({ message: 'Audio updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMediaPage = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "mediaFiles.html");
  res.sendFile(filePath);
};

const postMultipleImages = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const photo = req.files.map((file) => file.filename);
    console.log(req.params);
    const project = await Project.findById(req.params.id);
    console.log(project);
    const userId = req.user.id
    if (!userId) {
      return res.status(400).json({ message: 'Must be logged in' });
    }
    if (photo) {
      photo.forEach(element => {
        project.images.push(element);
      });
    }
    await project.save();

    res.json({ message: 'Multiple images updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }
    const photo = req.file.filename

    const userId = req.user.id
    const user = await User.findById(userId);
    console.log(user)


    if (photo) {
      user.profile_image = photo
    }
    await user.save();

    res.json({ message: 'Profile image updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postProfileImage,
  postMultipleImages,
  getMultipleImages,
  postMultipleAudioFiles, getMediaPage
};