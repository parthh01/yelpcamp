var express = require('express'); 
var router = express.Router(), 
	Campground = require('../models/campgrounds'),
    Comment = require('../models/comments'),
    middleware = require('../middleware');
 

router.get("/",function(req,res){
	Campground.find({},function(err,result){
		if (err){ 
			console.log(err)
		} else{ 
			res.render('campgrounds/index', {campgrounds: result})
		}
	})
})

router.post("/",middleware.isLoggedIn, function(req,res,){ 
	var NewSiteName = req.body.name; 
	var NewImgUrl = req.body.imageurl;
	var price = req.body.price;
	var NewDesc = req.body.description;
	var newGround = {
		name: NewSiteName, 
		image: NewImgUrl, 
		price: price,
		description: NewDesc,
		author: {
			id: req.user._id, 
			username: req.user.username
		}
	}; 
	Campground.create(newGround, function(err,newresult){
		if (err){ 
			console.log(err)
		} else { 
			res.redirect("/campgrounds")
		}
	})
})
router.get("/new", middleware.isLoggedIn, function(req,res){ 
	res.render("campgrounds/new")
})

router.get("/:id", function(req,res){
	var groundId = req.params.id.trim(); 
	Campground.findById(groundId).populate("comments").exec(function(err,result){ 
		if (err){ 
			console.log(err)
		} else { 
			res.render("campgrounds/show",{ground: result})
		}
	})
})

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	console.log('the id is: ' + req.params.id)
	Campground.findById(req.params.id,function(err,result){
		if (err){
			console.log(err)
		} else { 
			res.render("campgrounds/edit",{ground:result})
		}
	})
})

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//sanitize input needed 
	updatedGround = { 
		name: req.body.name,
		image: req.body.imageurl,
		price: req.body.price,
		description: req.body.description
	}
	Campground.findByIdAndUpdate(req.params.id,updatedGround,function(err,updated){
		if (err){
			console.log(err)
		} else { 
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if (err){
			console.log(err)
		} else { 
			res.redirect("/campgrounds")
		}
	})
})







module.exports = router; 




