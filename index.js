const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const GreetRoutes = require('./greetedNames');
const Models = require('./models');

const models = Models(process.env.MONGO_DB_URL ||'mongodb://localhost:27017/greetings');
const mongoose = require('mongoose');

const greetRoutes = GreetRoutes(models);

// instance of express
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse the application
app.use(bodyParser.json());

//make session expire when it reaches a certain age
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true
}));

////use flash to display flash messages
app.use(flash());
// app.get('/home', function(req, res){
// 	res.send('Welcome!');
// 	// res.redirect('/greetedNames')
// });

app.get('/', greetRoutes.index);
app.get('/greetedNames', greetRoutes.addNameScreen);
app.post('/greetedNames', greetRoutes.addName);

// app.post('/greetedNames', greetRoutes.addName);

// app.get('counter')

const port = 3005;
app.set('port',process.env.PORT || port);

//initialise port number for app to run on
app.listen(port, function(){
	console.log('App started on port: ' + port);
});
