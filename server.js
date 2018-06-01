const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();

const User = require('./models/user');

//set routes
require('./config/passport')(passport);
require('./config/database');
const home = require('./routes/home');
const login = require('./routes/login');
const logout = require('./routes/logout');
const account = require('./routes/account');
const bio = require('./routes/bio');
const shows = require('./routes/shows');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({ 
	secret: "itsASecretToEveryone",
	resave: false,
	saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	next();
})

//use routes
app.use('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/account', account);
app.use('/bio', bio);
app.use('/shows', shows);

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})




/*

To Do

Set login page routing
set passport local
create fields to edit content and shows
edit home to show 3 future shows
list pages to create (start small dummy)
Put together home page
authenticate everything
Styling


*/