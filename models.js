const mongoose = require('mongoose');

module.exports = function(mongoUrl){
	mongoose.Promise = global.Promise;
	console.log(mongoUrl);
	mongoose.connect(mongoUrl, {useMongoClient: true}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('We are connected');
		}
	});

	const NameSchema = mongoose.Schema({
		name: String,
		count: Number
	});

	const Name = mongoose.model('name', NameSchema);


	return{
		Name
	};
}
