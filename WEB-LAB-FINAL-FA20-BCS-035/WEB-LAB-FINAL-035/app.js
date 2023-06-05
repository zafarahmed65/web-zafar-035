const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
var expressLayouts = require ('express-ejs-layouts');
const studentRoutes = require ('./routes/studentRoutes');
const Student = require ('./models/student');

const app = express ();
app.set ('view engine', 'ejs');
app.use (bodyParser.urlencoded ({extended: true}));

// Connect to MongoDB
mongoose.connect ('mongodb+srv://zafar:zafar@cluster0.emfu5bh.mongodb.net/apiprac', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => console.log ('Connected to MongoDB'))
  .catch (error => console.log (error.message));


// Routes
app.use ('/', studentRoutes);

// Start the server
const port = 3000;
app.listen (port, () => {
  console.log (`Server running on port ${port}`);
});
