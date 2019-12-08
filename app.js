var express = require("express"), 
	app = express(), 
	request = require("request"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require('./models/campgrounds'),
	seedDB = require('./seeds'), 
	Comment = require('./models/comments'), 
	passport = require('passport'),
	LocalStrategy = require('passport-local'), 
	User = require('./models/user'),
    sanitizer = require('express-sanitizer'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash');

app.use(methodOverride("_method"));
app.use(sanitizer());  

var commentRoutes = require('./routes/comments'), 
	campgroundRoutes = require('./routes/campgrounds'),
	restRoutes = require('./routes/rest'); 

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true , useUnifiedTopology: true }); 

// seedDB(); 

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/public"))
app.use(require('express-session')({
	secret: 'secret key',
	resave: false ,
	saveUninitialized: false
}))


app.use(flash()); 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
app.use(function(req,res,next){
	res.locals.currentUser = req.user; 
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");  
	next()
})

app.use(restRoutes); 
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes); 
 



app.listen(process.env.PORT,function(){
	console.log("YelpCamp app is listening on port 3000");
})

//hosted on https://powerful-bastion-10323.herokuapp.com



