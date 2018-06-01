const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
	title: String,
	article: String,
	date: Date
});

const News = mongoose.model('New', newsSchema);

module.exports = News;