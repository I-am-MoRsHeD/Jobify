const mongoose = require('mongoose');


const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    about: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    members: {
        type: Number,
        require: true,
    },
    totalBranch: {
        type: Number,
        require: true,
    },
    
});


module.exports = companySchema;
