const mongoose = require('mongoose');
const config = require('../mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    unmae: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: String
    }
})
const admin = module.exports = mongoose.model('admins', userSchema);

module.exports.addUser = function(newUSer, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt).then(function(hash) {
            newUSer.password = hash;
            newUSer.save(callback)
        }).catch(err => {
            console.log(err);
        })
    })
}
module.exports.getUserByName = function(email, callback) {
    const query = { email: email };
    admin.findOne(query, callback);
}
module.exports.comparePassword = function(candidiatepassword, hash, callback) {
    bcrypt.compare(candidiatepassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch)
    })
}
module.exports.getUserById = function(id, callback) {
    admin.findById(id, callback);
}