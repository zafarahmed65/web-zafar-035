var express = require('express');
const bcrypt = require ('bcryptjs');
let {User} = require ('../models/user');
var router = express.Router();

router.get ('/login', (req, res) => {
  res.render ('auth/login', {});
});

router.post ('/login', async (req, res) => {
  let user = await User.findOne({email: req.body.email});
  if (!user) {
    // req.setFlash ('danger', 'User with this email not present');
    console.log("User with this email not present")
    return res.redirect ('/login');
  }
  const validPassword = await bcrypt.compare (req.body.password, user.password);
  if (validPassword) {
    // req.session.user = user;
    // req.setFlash ('success', 'Logged in Successfully');
    console.log ('Login Successfully');
    return res.redirect ('/');
  } else {
    // req.setFlash ('danger', 'Invalid Password');
    console.log ('Invalid Password');
    return res.redirect ('/login');
  }
});

router.get ('/register', (req, res) => {
  res.render ('auth/register', {});
});
router.post ('/register', async (req, res) => {
  let userObj = req.body;
  const salt = await bcrypt.genSalt (10);
  const hashed = await bcrypt.hash (userObj.password, salt);
  userObj.password = hashed;
  let user = new User (userObj);
  await user.save ();
  res.redirect ('/');
});

module.exports = router;

