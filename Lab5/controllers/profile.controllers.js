const getProfileInfos = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateProfile = async (req, res) => {
    try {
      const { name, currentPassword, newPassword, hobby, profession  } = req.body;
      console.log(newPassword)
      
      const userId = req.user.id
      const user = await User.findById(userId);
      console.log(user)
  
  
  

      if (newPassword) {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
  
      if (hobby) {
        user.hobby = hobby;
      }
  
  
      if (profession) {
        user.profession = profession
      }
  
      await user.save();
  
      res.json({ message: 'User information updated successfully' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
  
  const deleteProfile = async (req, res) => {
    try {
      const profileID = req.params.id;
      const profileInfo = await User.findById(profileID);
  
      if (!profileInfo) {
        return res.status(404).json({ error: "Profile information not found" });
      }
  
      await profileInfo.deleteOne({ _id: profileID });
  
      res.json({ message: "Profile information deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports={
    getProfileInfos,
    updateProfile,
    deleteProfile,
  }

  
