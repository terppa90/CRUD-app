const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const connectDB = require('./server/database/connection');
// mongoDB connection
connectDB();

require('dotenv').config();
const PORT = process.env.PORT || 3005;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(logger('dev'));

// parse request to body-parser
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

// set view engine
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set(views, path.resolve(__dirname, 'views/ejs'));

// load assets

app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// load routers

app.use('/', require('./server/routes/router'));

/*
app.get('/', (req, res) => {
  res.send('Crud App');
});
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
