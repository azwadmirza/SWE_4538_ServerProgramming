const User = require("../dataModels/User.model");
const Hobby = require("../dataModels/Hobby.model");

const addHobby=async(req,res)=>{
    const {title}=req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user){
      const result=await Hobby.create({user_id:userId,title:title});
      res.status(200).json(result);
    }
    else{
      res.status(404).json({error:"User not found"});
    }
  }
  
  const deleteHobby=async(req,res)=>{
    const hobby_id=req.params.id;
    try{
      await Hobby.deleteOne({_id:hobby_id});
      res.status(200).json({success:true});
    }
    catch(err){
      res.status(404).json({error:err.message});
    }
  }
  
  const getHobby=async(req,res)=>{
    const userId = req.user.id;
    try{
      const result=await Hobby.find({user_id:userId});
      res.status(200).json(result);
    }
    catch{
      res.status(400).json({err:"user not found"});
    }
  }


  module.exports = {
    addHobby,
    deleteHobby,
    getHobby
  };