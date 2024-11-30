const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
   apprentice: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprentice', required: true },
   modality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality', required: true },
   startDate: { type: Date, required: true },
   endDate: { type: Date },
   company: { type: String, required: true },
   phonecompany: { type: String, required: true},
   addresscompany: { type: String, required: true},
   emailCompany: { type: String, required: true },
   owner: { type: String, required: true },
   docAlternative: { type: String, required: true },
   hour: { type: String, required: true },
   businessProyectHour: { type: String, required: true },
   productiveProyectHour: {type: String},
   status: {type: Number, default: 1},
   assignment: [
      {
         followUpInstructor: { type: Object },
         technicalInstructor: { type: Object },
         projectInstructor: { type: Object },
         status: { type: Number, default: 1 }
      }
   ],
   certificationDoc: { type: String, required: true },
   judymentPhoto: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Register", registerSchema);
