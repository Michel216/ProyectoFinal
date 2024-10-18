const mongoose = require('mongoose');

const followupSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    instructor: { type: mongoose.Schema.Types.ObjectId },
    number: { type: Number, required: true },
    month: { type: Date, required: true },
    document: { type: String, required: true },
    status: { type: Number, default: 1 },
    users: { type: String, required: true },
    observations:[
        { 
            observation:{ type: String, required:true},
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'userEp', require: true},
            observationDate:{type: Date, required: true}
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Followups", followupSchema)