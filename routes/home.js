const express = require('express');
const app = express();

const Content = require('../models/content');
const News = require('../models/news');
const Show = require('../models/show');

app.get('/', (req, res, next) => {
	Content.find({}, (err, content) => {
		contentObj = {};
		contentObj['headline'] = content[0].headline;
		contentObj['bio'] = content[0].bio;	
		Show.find({}, (err, shows) => {

			let next3= [];

			shows.sort((a,b) => {
				return new Date(a.date) - new Date(b.date);
			})
			if(shows.length > 3) {
				let length = 3;
				let max = shows.length;
				for (let i = 0; i < length; i++) {
					if(i === max) {
						break;
					}
					if(shows[i].date < new Date()) {
						length++;
					} else {
						next3.push(shows[i]);
					}
					
				}
				res.render('./pages/home', {
			 		content: contentObj,
		 			shows: next3
		 		});
			} else {
				res.render('./pages/home', {
			 		content: contentObj,
		 			shows: shows
		 		});
			}

	 	});
	});
})

module.exports = app;