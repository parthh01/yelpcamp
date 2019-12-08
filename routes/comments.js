var express = require('express'),
	router = express.Router({mergeParams: true}), 
	Campground = require('../models/campgrounds'),
    Comment = require('../models/comments'),
    middleware = require('../middleware');

router.get("/new",middleware.isLoggedIn,function(req,res){
		var groundId = req.params.id.trim(); 
	Campground.findById(groundId).populate("comments").exec(function(err,result){ 
		if (err){ 
			console.log(err)
		} else { 
			res.render("comments/new",{ground: result})
		}
	})
})

router.post("/",middleware.isLoggedIn, function(req,res){
		Campground.findById(req.params.id,function(err,campground){
			if (err){ 
				console.log(err)
			} else { 
				Comment.create(req.body.comment,function(err,comment){
					if (err){
						console.log(err)
					} else { 
						comment.author.id = req.user._id;
						comment.author.username = req.user.username;
						comment.save()
						campground.comments.push(comment)
						campground.save()
						req.flash("success","added comment")
						res.redirect("/campgrounds/" + campground._id)
					}
				})
						}
					})	
})

router.get("/:commentid/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.commentid,function(err,comment){
		if (err){
			console.log(err)
		} else { 
			Campground.findById(req.params.id,function(err,result){
				if (err){
					console.log(err)
				} else { 
					res.render("comments/edit",{comment:comment,ground:result})
				}
			})
		}
	}) 

})

router.put("/:commentid",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,comment){
		if (err){
			console.log(err)
		} else { 
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

router.delete("/:commentid",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.commentid,function(err){
		if (err){
			console.log(err)
		} else { 
			req.flash("success","comment deleted")
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})





module.exports = router 