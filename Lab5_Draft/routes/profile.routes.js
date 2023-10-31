const express = require("express");
const router = express.Router();
const {
    updateProfile,
    getProfileInfos,
    deleteProfile,
}= require("../controllers/profile.controllers");

router.get("/profiles", getProfileInfos);
router.patch("/update-profile",  updateProfile);
router.delete("/delete-profile/:id", deleteProfile);

module.exports=router;