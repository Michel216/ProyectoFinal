const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
   apprentice: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprentice', required: true },
   modality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality', required: true },
   startDate: { type: Date, required: true },
   endDate: { type: Date, required: true },
   company: { type: String, required: true }, 
   phonecompany: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
   addresscompany: { type: String, required: true, unique: true, minlength: 7 }, 
   owner: { type: String, required: true },
   docAlternative: { type: String, required: true },
   hour: { type: String, required: true }, 
   status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model("Register", registerSchema);
