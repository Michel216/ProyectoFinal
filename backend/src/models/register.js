const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
   apprentice: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprentice', required: true },
   modality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality', required: true },
   startDate: { type: Date, required: true },
   endDate: { type: Date, required: true },
   company: { type: String, required: true },
   phonecompany: { type: String, required: true},
   addresscompany: { type: String, required: true},
   emailCompany: { type: String, required: true },
   owner: { type: String, required: true },
   docAlternative: { type: String, required: true },
   hour: { type: String, required: true },
   businessProyectHour: { type: Number, required: true },
   assignment: [
      {
         followUpInstructor: { type: Object, required: true },
         technicalInstructor: { type: Object, required: true },
         projectInstructor: { type: Object, required: true },
         status: { type: Number, default: 1 }
      }
   ],
   certificationDoc: { type: String, required: true },
   judymentPhoto: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Register", registerSchema);
