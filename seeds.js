var mongoose 	= require('mongoose'), 
	Campground 	= require('./models/campgrounds'), 
	Comment 	= require('./models/comments'),
	User 		= require('./models/users'); 

var data = [ 
	{ 
		name: "King's Park",
		image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "This is a nice campsite"
	},
	{ 
		name: "Sai Kung",
		image: "https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "This is a nice campsite"
	},
	{ 
		name: "Lady MacleHose",
		image: "https://images.unsplash.com/photo-1531881503977-91282087e0c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "This is a nice campsite"
	}
]; 

function SeedDB(){
	Campground.remove({},function(err){
	// 	if (err){ 
	// 		console.log(err)
	// 	} else { 
	// 		console.log('All Campgrounds Removed')
	// 		Comment.remove({},function(err){
	// 			if (err){
	// 				console.log(err)
	// 			} else { 
	// 				console.log('All Comments Removed')
	// 				data.forEach(function(elem){
	// 					Campground.create(elem,function(err,newground){
	// 						if (err){
	// 							console.log('err')
	// 						} else { 
	// 							Comment.create({
	// 								text: "this was a great place to camp",
	// 								author: "Kurt Cobain"
	// 							},function(err,newcomment){
	// 								if (err) { 
	// 									console.log(err)
	// 								} else { 
	// 									newground.comments.push(newcomment)
	// 									newground.save()
	// 								}
	// 							})
	// 						}
	// 					})
	// 				})
	// 			}
	// 		})
	// 	}
	 })

}



module.exports = SeedDB ; 

