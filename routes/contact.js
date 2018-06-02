const express = require('express');
const app = express();
const PASSWORD = process.env.PASSWORD;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.get('/', (req, res, next) => {
	res.render('./pages/contact');
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'AOL',
  auth: {
    user: 'nhrboka@aol.com',
    pass: PASSWORD
  }
});

app.post('/', function (req, res) {
	res.set({
      'Access-Control-Allow-Origin': '*'
    })
    req.headers['Access-Control-Allow-Origin'] = '*'
	let email = req.body.contactEmail;
	let name = req.body.contactName;
	let text = req.body.contactMessage;

  	const from = name && email ? `${name} <${email}>` : `${name || email}`
 	const mailOptions = {
	    from: 'nhrboka@aol.com',
	    to: 'doylerulesmisfitstribute@gmail.com',
	    subject: `New message from ${from} at doylerules.band`,
	    text
  	};

  	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.redirect('back');
	    }else{
	        console.log('Message sent: ' + info.response);
	        res.redirect('back');
    	};
  	});
})

module.exports = app;