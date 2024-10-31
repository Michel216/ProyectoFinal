const mongoose = require('mongoose');

const binnacleSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    instructor: { type: mongoose.Schema.Types.ObjectId},
    number: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    document: { type: String, required: true },
    // month: { type: Date, required: true },
    status: { type: Number, default: 3, enum: [1, 2, 3, 4]}, // valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4
    observations: [{
        observation: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, required: true },
        observationDate: { type: Date, required: true }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Binnacle", binnacleSchema)