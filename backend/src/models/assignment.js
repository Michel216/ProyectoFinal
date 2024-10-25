const mongoose = require('mongoose');

const assignmentShema = new mongoose.Schema({
    register: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    followInstructor: { type: instructorSchema, default: {} },
    technicalInstructor: { type: instructorSchema, default: {} },
    proyectInstructor: { type: instructorSchema, default: {} },
    certificationdoc: { type: String, require: true },
    judymenthphoto: { type: String, default: true },
    observation: { type: String, require: true },
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentShema)