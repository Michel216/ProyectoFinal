const mongoose = require('mongoose');

const binnacleSchema = new mongoose.Schema({
   assignament: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    // instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    number: { type: Number, required: true },
    document: { type: String, required: true },
    status: { type: Number, default: 1 },
    observations: { type: String, required: true },
    users: { type: String, required: true },
    // createdAt: { type: String, require: true },
    // updatedAt: { type: String, require: true }
}, { timestamps: true })

module.exports = mongoose.model("Binnacle", binnacleSchema)