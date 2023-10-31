const User = require("../dataModels/User.model");
const Project = require("../dataModels/Project.model");

const addProject=async(req,res)=>{
    const {title}=req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user){
      const result=await Project.create({user_id:userId,title:title});
      res.status(200).json(result);
    }
    else{
      res.status(404).json({error:"User not found"});
    }
  }
  
  const deleteProject=async(req,res)=>{
    const Project_id=req.params.id;
    try{
      await Project.deleteOne({_id:Project_id});
      res.status(200).json({success:true});
    }
    catch(err){
      res.status(404).json({error:err.message});
    }
  }
  
  const getProject=async(req,res)=>{
    const userId = req.user.id;
    try{
      const result=await Project.find({user_id:userId});
      res.status(200).json(result);
    }
    catch{
      res.status(400).json({err:"user not found"});
    }
  }


  module.exports = {
    addProject,
    deleteProject,
    getProject
  };