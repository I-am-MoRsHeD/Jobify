const { default: mongoose } = require("mongoose");

const jobsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    jobId: {
        type: Number,
        require: true,
    },
    salary: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = jobsSchema;

