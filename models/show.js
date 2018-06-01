const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: Date,
	venue: String,
	time: String,
	bands: String,
	city: String
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;