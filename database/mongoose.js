const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// ######connecting to database
// mongodb+srv://shazaib:mausamash@cluster0.2cuhh.mongodb.net/unique
// mongoose.connect('mongodb://127.0.0.1:27017/unique', {
mongoose.connect('mongodb://127.0.0.1:27017/unique', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }).then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log(err);
    })
    // ######connecting to database
const secret = "shazaib";
module.exports = mongoose;
module.exports.secret = secret;