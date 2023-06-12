const express = require ('express');
const router = express.Router ();
const {Service} = require ('../models/service');

router.get ('/', async (req, res) => {
  try {
    const services = await Service.find ();
    res.render ('myservices', {services});
  } catch (err) {
    console.error (err);
    res.status (500).send ('Server Error');
  }
});


module.exports = router;
