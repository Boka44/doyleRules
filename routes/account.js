const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Content = require('../models/content');
const News = require('../models/news');
const Show = require('../models/show');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  	console.log('isAuthenticated')
    return next();
  };
  res.redirect('/login');
}

app.get('/', isAuthenticated, (req, res, next) => {
	Content.find({}, (err, content) => {
		contentObj = {};
		contentObj['headline'] = content[0].headline;
		contentObj['bio'] = content[0].bio;		
		Show.find({}, (err, shows) => {
			res.render('./pages/account', {
		 		content: contentObj,
		 		shows: shows
		 	});
		})
	});
})

app.post('/headline', isAuthenticated, (req, res, next) => {
	const text = req.body.textHead;
	Content.findOneAndUpdate({}, { headline: text}, (err, doc) => {
		res.redirect('back');
	})
})

app.post('/bio', isAuthenticated, (req, res, next) => {
	const text = req.body.textBio;
	Content.findOneAndUpdate({}, { bio: text}, (err, doc) => {
		res.redirect('back');
	})
})

app.post('/shows/add', isAuthenticated, (req, res, next) => {
	
	const date = req.body.showDate;
	const venue = req.body.showVenue;
	const time = req.body.showTime;
	const bands = req.body.showBands;
	const city = req.body.showCity;

	let showObj = new Show ({
		_id: new mongoose.Types.ObjectId(),
		date: date,
		venue: venue,
		time: time,
		bands: bands,
		city: city
	});

	showObj.save((err, doc) => {
		res.redirect('back');
	})
})

app.post('/shows/edit/:id', isAuthenticated, (req, res, next) => {
	const id = req.params.id;
	const date = req.body.showDate;
	const venue = req.body.showVenue;
	const time = req.body.showTime;
	const bands = req.body.showBands;
	const city = req.body.showCity;

	let showObj ={
		_id: id,
		date: date,
		venue: venue,
		time: time,
		bands: bands,
		city: city
	}

	Show.findByIdAndUpdate(id, showObj, (err, doc) => {
		res.redirect('back');
	})
})

app.post('/shows/delete/:id', isAuthenticated, (req, res, next) => {
	const id = req.params.id;

	Show.findByIdAndDelete(id, (err, doc) => {
		res.redirect('back');
	})
})

module.exports = app;