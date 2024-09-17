const mongoose = require('mongoose');
// import { Schema, model } from 'mongoose';

const binnacleSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    number: { type: Number, required: true },
    document: { type: String, required: true },
    status: { type: Number, default: 1 },
    observations: [{
        observation: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserEp' },
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Binnacle", binnacleSchema)