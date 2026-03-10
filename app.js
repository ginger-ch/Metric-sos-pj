const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());


//login page
app.use('/', require('./route/auth-route'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));