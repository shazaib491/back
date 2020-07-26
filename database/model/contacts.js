const mongoose = require('mongoose');
const config = require('../mongoose');


const ContactSchemma = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    },
    mobile: {
        type: String
    }
})
const contacts = module.exports = mongoose.model('contacts', ContactSchemma);


module.exports.addContacts = function(contacts, callback) {
    contacts.save(callback);
}