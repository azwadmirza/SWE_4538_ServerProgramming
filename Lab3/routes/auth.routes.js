const express = require("express");
const router = express.Router();
const {
    getLogin,
    getRegister,
    postLogin,
    postRegister, 
    test_id_find
  } = require("../controllers/auth.controllers");

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);


module.exports = router;