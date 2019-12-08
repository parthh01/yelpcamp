var Campground = require('../models/campgrounds'),
	Comment = require('../models/comments'); 


var middlewareObj

var middlewareObj = {

	isLoggedIn: function(req,res,next){
	if (req.isAuthenticated()){
		next()
	} else { 
		req.flash("error","Log In First")
		res.redirect("/login")
	}
},

checkCampgroundOwnership: function(req,res,next){
	if (req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,result){
			if (err){
				req.flash("error","Campground not found")
				res.redirect("back")
			} else { 
				if (result.author.id.equals(req.user._id)){
					next()
				} else {
					req.flash("error","you dont have permission to do that")
					res.redirect("back");
				}
			}
		})
	} else { 
		req.flash("error","you need to be logged in")
		res.redirect("back")
	}
},

checkCommentOwnership: function(req,res,next){
	if (req.isAuthenticated()){
		Comment.findById(req.params.commentid,function(err,result){
			if (err){
				res.redirect("back")
			} else { 
				if (result.author.id.equals(req.user._id)){
					next()
				} else {
					req.flash("error","you dont have permission to do that")
					res.redirect("back");
				}
			}
		})
	} else { 
		req.flash("error","you need to be logged in")
		res.redirect("back")
	}
}


};




module.exports = middlewareObj; 