const mongoose = require('mongoose');

const followupSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    instructor: { type: mongoose.Schema.Types.ObjectId, required: true },
    number: { type: Number, required: true, enum: [1, 2, 3]  },
    month: { type: Date, required: true },
    document: { type: String, required: true },
    status: { type: Number, default: 3, enum: [1, 2, 3, 4] },
    observations:[
        { 
            observation:{ type: String, required: true},
            user: { type: mongoose.Schema.Types.ObjectId, require: true},
            observationDate:{type: Date, required: true}
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Followups", followupSchema)