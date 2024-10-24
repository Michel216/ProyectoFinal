const mongoose = require('mongoose');

const modalitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    hourInstructorFollow: { type: Number, default: 0 },
    hourInstructorTechnical: { type: Number, default: 0 },
    hourInstructorProject: { type: Number, default: 0 },
    status: { type: Number, default: 1 }
}, { timestamps: true })

module.exports = mongoose.model("Modality", modalitySchema)