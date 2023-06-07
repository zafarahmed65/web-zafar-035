const express = require("express");
const bcrypt = require("bcryptjs");
const flash = require ('connect-flash');
let router = express.Router();
let User = require("../models/User");
let sessionAuth = require("../middlewares/sessionAuth");
let admin = require("../middlewares/admin");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.setFlash("danger", "Logged out!");
  // req.session.flash = { type: "success", message: "Logged Out Successfully!" };
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.setFlash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.setFlash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    req.setFlash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post ('/register', async (req, res) => {
  let userObj = req.body;
  const salt = await bcrypt.genSalt (10);
  const hashed = await bcrypt.hash (userObj.password, salt);
  userObj.password = hashed;

  try {
    let user = await User.findOne ({email: userObj.email});
    if (user) {
      req.setFlash ('danger', 'User with this email already exists');
      return res.redirect ('/register');
    }

    user = new User (userObj);
    await user.save ();

    req.setFlash ('success', 'Registration successful! You can now log in.');
    res.redirect ('/');
  } catch (error) {
    console.error (error);
    req.flash (
      'danger',
      'An error occurred during registration. Please try again.'
    );
    res.redirect ('/register');
  }
});


router.get("/profile", sessionAuth, async (req, res) => {
  //this route should be protected
  res.render("auth/profile");
});

router.get("/admin-profile", sessionAuth, admin, async (req, res, next) => {
  //this route should be protected
  res.render("auth/admin-profile");
  // next();
});

module.exports = router;
