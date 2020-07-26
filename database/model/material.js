const mongoose = require('mongoose');
const config = require('../mongoose');

const userSchema = mongoose.Schema({
    p_name: {
        type: String,
        required: true
    },
    p_sname: {
        type: String,
        required: true,
    },
    discount: {
        type: String
    },
    price: {
        type: Number
    },
    p_category: {
        type: String
    },
    image: {
        type: String
    },
    c_date: {
        type: Date
    },
    u_date: {
        type: Date
    }

})
const material = module.exports = mongoose.model('material', userSchema);


// ########### Insert ###########
module.exports.addMaterail = function(materail, callback) {
        materail.save(callback);
    }
    //########### Insert ###########