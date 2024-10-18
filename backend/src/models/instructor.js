const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tpdocument: { type: String, required: true },
    numdocument: { type: String, required: true },
    emailpersonal: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    knowledge: { type: String },
    thematicarea: { type: String },
    bindingtype: { type: String },
    caphour: { type: Number },
    hourswork: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Instructor', instructorSchema);
