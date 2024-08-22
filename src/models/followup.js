const mongoose = require('mongoose');

const followupSchema = new mongoose.Schema({
    assigment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    // instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    number: { type: Number, required: true },
    month: { type: Date, required: true },
    document: { type: String, required: true },
    status: { type: Number, default: 1 },
    users: { type: String, required: true },
    observations: { type: String, required: true },
    // createdAt: { type: String, require: true },
    // updatedAt: { type: String, require: true }
}, { timestamps: true })

module.exports = mongoose.model("Followups", followupSchema)