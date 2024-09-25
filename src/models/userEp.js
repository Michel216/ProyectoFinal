const mongoose = require('mongoose');

const userEpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    status: {type: Number, default: 1},
}, { timestamps: true })


module.exports = mongoose.model("UserEp", userEpSchema)