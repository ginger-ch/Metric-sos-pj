const express = require('express');
const session = require('express-session');
const flash   = require('connect-flash');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());

const homeModel = require('./model/home-model');

app.use(async (req, res, next) => {
  try {
    res.locals.categories = await homeModel.getCategories();
  } catch (err) {
    res.locals.categories = [];
  }
  next();
});

app.use('/', require('./route/auth-route'));
app.use('/admin', require('./route/admin-route'));
app.use('/', require('./route/webstore-route'));

app.listen(4000, () => {
  console.log('Girlette running at http://localhost:4000');
});