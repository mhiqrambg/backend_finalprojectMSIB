const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//db
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//router
const categoriesRouter = require('./app/api/v1/categories/router');
const usersRouter = require('./app/api/v1/users/router');
const productsRouter = require('./app/api/v1/products/router');

const v1 = '/api/v1/cms';
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api storage',
  });
});

app.use(v1, categoriesRouter);
app.use(v1, usersRouter);
app.use(v1, productsRouter);
module.exports = app;
