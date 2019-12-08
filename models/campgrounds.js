
var mongoose = require('mongoose')


var groundSchema = new mongoose.Schema({
	name: String, 
	price: String,
	image: String, 
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User"
		}, 
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId, 
			ref: "Comment"
		}
	]
}); 

var Campground = mongoose.model("Campground", groundSchema); 

// Campground.create(
// {
// 	name: 'Kings Park', 
// 	image:'https://live.staticflickr.com/100/262874327_efccac44e4.jpg',
// 	description: 'This is a great campground located in Kings Park'
// }, function(err,added) {
// 	if (err){ 
// 		console.log("THERE WAS AN ERROR!")
// 		console.log(err)
// 	} else { 
// 		console.log("campground added")
// 		console.log(added)
// 	}
// })


module.exports = mongoose.model('Campground',groundSchema);
