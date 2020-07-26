const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// ######connecting to database
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
const secret="shazaib";
module.exports=mongoose;
module.exports.secret=secret;