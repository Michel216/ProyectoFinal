const mongoose = require('mongoose');

const apprenticeSchema = new mongoose.Schema({
    tpdocument: { type: String, required: true, enum: ["cédula de ciudadanía","tarjeta de identidad","cédula de extranjería"]},
    numDocument: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    fiche: { type: mongoose.Schema.Types.ObjectId, ref: 'Fiche' },
    status: { type: Number, default: 1 },
    // createdAt: { type: timestamps,type: String, require: true },
    // updatedAt: { type: timestamps,type: String, require: true }
}, { timestamps: true })

module.exports = mongoose.model("Apprentice", apprenticeSchema)