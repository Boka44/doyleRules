const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
	headline: String,
	bio: String
});

const Content = mongoose.model('content', contentSchema);

module.exports = Content;