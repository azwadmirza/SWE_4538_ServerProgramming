const express = require("express");
const router = express.Router();
const {
    addHobby,
    deleteHobby,
    getHobby
} = require("../controllers/hobby.controllers");


router.post("/add-hobby", addHobby);
router.delete("/delete-hobby/:id", deleteHobby);
router.get("/get-hobby", getHobby);


module.exports = router;