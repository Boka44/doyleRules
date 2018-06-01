const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new mongoose.Schema({
	user: String,
	password: String
});
const User = mongoose.model('User', userSchema);

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
function validPassword(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = User;