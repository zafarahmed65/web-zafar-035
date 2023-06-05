const express = require ('express');
const router = express.Router ();
const Student = require ('../models/student');

// Landing page route
router.get ('/', async (req, res) => {
  try {
    const students = await Student.find ();
    res.render ('index', {students});
  } catch (err) {
    console.error (err);
    res.status (500).send ('Server Error');
  }
});

// Add new student route (form)
router.get ('/add', (req, res) => {
  res.render ('add');
});

// Add new student route (submit form)
router.post ('/add', async (req, res) => {
  try {
    const {name, cgpa, skills, address} = req.body;
    const student = new Student ({
      name,
      cgpa,
      skills: skills.split (','),
      address,
    });
    await student.save ();
    res.redirect ('/');
  } catch (err) {
    console.error (err);
    res.status (500).send ('Server Error');
  }
});

// Delete student route
router.post ('/delete/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await Student.findByIdAndDelete (id);
    res.redirect ('/');
  } catch (err) {
    console.error (err);
    res.status (500).send ('Server Error');
  }
});

module.exports = router;
