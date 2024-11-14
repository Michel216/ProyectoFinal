const mongoose = require('mongoose');

const binnacleSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    instructor: { type: mongoose.Schema.Types.ObjectId},
    number: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    document: { type: String, required: true },
    // month: { type: Date, required: true },
    status: { type: Number, default: 1, enum: [1, 2, 3, 4, 5, 6]}, // valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4, Verificado técnico: 5, Verificado proyecto: 6
    observations: [{
        observation: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId },
        observationDate: { type: Date }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Binnacle", binnacleSchema)