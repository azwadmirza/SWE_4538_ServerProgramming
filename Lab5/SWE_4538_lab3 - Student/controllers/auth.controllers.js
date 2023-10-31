const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const dataHandler=require("../data/add_data");
const initializePassport = require("../config/passport");
const validate_password=require("../utility/password_validator");



let users = []; // store the user info here

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
  );

const getLogin = async (req, res) => {
  const result=await dataHandler.find();
  users=result;
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {

  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/failure-login",
    failureFlash: true
  })(req, res, next);
};


const getRegister = async (req, res) => {
  const result=await dataHandler.find();
  users=result;
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
  try {
    if(validate_password(req.body.password)===false){
      res.status(500).send('Password is not strong enough, it should contain upper case, lower case, symbols and numbers');
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // req.body.password ==> password should be exact match to register.html name=password,  10:how many time you want to generate hash. it's a standard default value
    users.push({
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    dataHandler.insert(Date.now().toString(),req.body.username,req.body.email,hashedPassword);

    res.status(200).redirect("/login");
  } catch(error) {
    console.log(error.message);
    res.status(500).redirect("/register");
  }
};


const failure=(req,res)=>{
  console.log('login failed');
  res.status(500).redirect("/login");
}



module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  failure
};
