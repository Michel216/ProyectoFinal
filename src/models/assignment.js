const mongoose = require('mongoose');

const assignmentShema = new mongoose.Schema({
    register: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    followInstructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    technicalInstructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'},
    proyectInstructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'},
    certificationdoc: { type: String, require: true },
    judymenthphoto: { type: String, default: true },
    observation: { type: String, require: true },
    status: { type: Number, default: 1 },
    // createdAt: { type: String, require: true },
    // updatedAt: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentShema)