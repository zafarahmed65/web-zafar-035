var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var servicesRouter=require('./routes/api/services');
var expressLayouts = require ('express-ejs-layouts');
var config=require('config');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use (express.json ());
app.use (expressLayouts);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use ('/', require ('./routes/auth'));
app.use(express.static(path.join(__dirname, 'public')));
// app.set ('views', path.join (__dirname, 'views'));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use ('/api/services', servicesRouter);

app.get ('/', (req, res) => {
  res.render ('homepage');
});
app.get ('/services', (req, res) => {
  res.render ('services');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen (5000, () => {
  console.log ('Server Started, Visit localhost:3000');
});

const mongoose = require ('mongoose');
mongoose
  .connect (config.get("db"), {
    useNewUrlParser: true,
  })
  .then (() => console.log ('Connected to Mongo ....'))
  .catch (error => console.log (error.message));
module.exports = app;
