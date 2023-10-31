const path=require('path')
const getMultipleImages = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId);
        const images = user.images

        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const postAudioFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }
        const audio = req.file.filename

        const userId = req.user.id
        const user = await User.findById(userId);
        console.log(user)


        if (audio) {
            user.audio = audio
        }
        await user.save();

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
  
      const userId = req.user.id
      const user = await User.findById(userId);
     
      if (photo) {
        user.images = photo
      }
      await user.save();
  
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
    postAudioFile, getMediaPage
};