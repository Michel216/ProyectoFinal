const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
   apprentice: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprentice', required: true },
   modality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality', required: true },
   startDate: { type: Date, required: true },
   endDate: { type: Date },
   company: { type: String, required: true },
   phoneCompany: { type: String, required: true},
   addresCompany: { type: String, required: true},
   emailCompany: { type: String, required: true },
   owner: { type: String, required: true },
   docAlternative: { type: String, required: true },
   hour: { type: Number, required: true },
   businessProyectHour: { type: Number, required: true },
   productiveProyectHour: {type: Number},
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
