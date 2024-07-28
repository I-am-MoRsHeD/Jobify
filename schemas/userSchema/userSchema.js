const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    password:{
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    role: {
        type: String
    }
})


module.exports = userSchema;

