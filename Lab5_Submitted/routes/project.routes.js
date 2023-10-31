const express = require("express");
const router = express.Router();
const {
    addProject,
    deleteProject,
    getProject
} = require("../controllers/project.controllers");


router.post("/add-project", addProject);
router.delete("/delete-project/:id", deleteProject);
router.get("/get-project", getProject);


module.exports = router;