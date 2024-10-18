const mongoose = require('mongoose');

const modalitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    hourInstructorFollow: { type: Number },
    hourInstructorTechnical: { type: Number },
    hourInstructorProject: { type: Number },
    status: { type: Number, default: 1 }
}, { timestamps: true })

module.exports = mongoose.model("Modality", modalitySchema)