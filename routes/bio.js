const express = require('express');
const app = express();

const Content = require('../models/content');

app.get('/', (req, res, next) => {
	Content.find({}, (err, content) => {
		let contentObj = {};
		contentObj['bio'] = content[0].bio;
		res.render('./pages/bio', {
			content: contentObj
		});
	})
})

module.exports = app;