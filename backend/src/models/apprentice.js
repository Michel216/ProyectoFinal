const mongoose = require('mongoose');

const apprenticeSchema = new mongoose.Schema({
    fiche: { type: mongoose.Schema.Types.ObjectId },
    modality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality' },
    tpdocument: { type: String, required: true, enum: ["cédula de ciudadanía", "tarjeta de identidad", "cédula de extranjería"] },
    numDocument: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    institutionalEmail: { type: String, required: true, unique: true },
    personalEmail: { type: String, required: true, unique: true },
    status: { type: Number, default: 1, enum: [0, 1, 2, 3, 4] } // inactivo: 0, activo: 1, en etapa productiva: 2, por certificación: 3, certificado: 4
}, { timestamps: true })

module.exports = mongoose.model("Apprentice", apprenticeSchema)