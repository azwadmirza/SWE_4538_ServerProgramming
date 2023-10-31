const express = require("express");
const router = express.Router();
const {
    getLogin,
    getRegister,
    postLogin,
    postRegister, 
    failure
  } = require("../controllers/auth.controllers");

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/failure-login",failure);


module.exports = router;