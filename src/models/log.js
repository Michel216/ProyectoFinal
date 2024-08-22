const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    users: { type: String, required: true },
    email:{ type: String, require: true },
    action: { type: String, required: true },
    information: { type: Object, required: true },
    // createdAt: { type: String, require: true },
    // updatedAt: { type: String, require: true }
}, { timestamps: true })


module.exports = mongoose.model("Logs", logsSchema)
