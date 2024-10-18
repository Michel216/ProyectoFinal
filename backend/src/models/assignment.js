const mongoose = require('mongoose');

const assignmentShema = new mongoose.Schema({
    register: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    followInstructor: { type: mongoose.Schema.Types.ObjectId,},
    technicalInstructor: { type: mongoose.Schema.Types.ObjectId,},
    proyectInstructor: { type: mongoose.Schema.Types.ObjectId,},
    certificationdoc: { type: String, require: true },
    judymenthphoto: { type: String, default: true },
    observation: { type: String, require: true },
    status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentShema)