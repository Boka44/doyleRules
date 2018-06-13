const express = require('express');
const app = express();

const Show = require('../models/show');

app.get('/', (req, res, next) => {
	Show.find({}, (err, shows) => {

		let futureShows = [];
		
		shows.sort((a,b) => {
			return new Date(a.date) - new Date(b.date);
		})

		for (let i = 0; i < shows.length; i++) {
			if(shows[i].date >= new Date()) {
				futureShows.push(shows[i]);
			}	
		}
		res.render('./pages/shows', {
 			shows: futureShows
 		});
	})
})

app.get('/all', (req, res, next) => {
	Show.find({}, (err, shows) => {
		let futureShows = [];
			
		shows.sort((a,b) => {
			return new Date(a.date) - new Date(b.date);
		})

		for (let i = 0; i < shows.length; i++) {
			if(shows[i].date >= new Date()) {
				futureShows.push(shows[i]);
			}	
		}
		res.send(futureShows);
	})
})


// send initial request from code in googleCal.js

// below is to retrieve auth token.


app.get('/oauthcallback', (req, res, next) => {

	// const {tokens} = await oauth2Client.getToken(code)
	// oauth2Client.setCredentials(tokens);

})



module.exports = app;