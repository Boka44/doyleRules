const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
	req.logout();
    res.redirect('/');
})

module.exports = app;