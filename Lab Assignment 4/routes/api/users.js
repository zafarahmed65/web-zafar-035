// const express = require ('express');
// let router = express.Router ();
// let {User} = require ('../../models/User');
// const bcrypt = require ('bcrypt');
// const _ = require ('lodash');
// const jwt = require ('jsonwebtoken');
// const config = require ('config');

// router.post ('/register', async (req, res) => {
//   let user = await User.findOne ({email: req.body.email});
//   if (user) return res.status (400).send ('User already registered');
//   user = new User ();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.password = req.body.password;
//   await user.generateHashedPassword();
//   await user.save ();
//   return res.send (_.pick (user, ['name', 'email']));
// });

// router.post ('/login', async (req, res) => {
//   let user = await User.findOne ({email: req.body.email});
//   if (!user) return res.status (400).send ('User not registered');
//   let isValid = await bcrypt.compare (req.body.password, user.password);
//   if (!isValid) return res.status (400).send ('Invalid password');
//   let token = jwt.sign (
//     {_id: user._id, name: user.name},
//     config.get ('jwtPrivatekey')
//   );
//   res.send (token);
// });
// module.exports = router;


const express = require ('express');
const router = express.Router ();
const User = require ('../../models/User');
const bcrypt = require ('bcrypt');
const _ = require ('lodash');
const jwt = require ('jsonwebtoken');
const config = require ('config');

router.post ('/register', async (req, res) => {
  let user = await User.findOne ({email: req.body.email});
  if (user) return res.status (400).send ('User already registered');
  user = new User ();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword ();
  await user.save ();
  return res.send (_.pick (user, ['name', 'email']));
});

router.post ('/login', async (req, res) => {
  let user = await User.findOne ({email: req.body.email});
  if (!user) return res.status (400).send ('User not registered');
  let isValid = await bcrypt.compare (req.body.password, user.password);
  if (!isValid) return res.status (400).send ('Invalid password');
  let token = jwt.sign (
    {_id: user._id, name: user.name},
    config.get ('jwtPrivateKey')
  );
  res.send (token);
});

module.exports = router;
