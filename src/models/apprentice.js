// const mongoose = require('mongoose');

// const apprenticeSchema = new mongoose.Schema({
//     tpdocument: { type: String, required: true },
//     numDocument: { type: String, required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     phone: { type: Number, required: true },
//     email: { type: String, required: true },
//     // fiche: { type: mongoose.Schema.Types.ObjectId, ref: 'Fiche' },
//     status: { type: Number, default: 1 },
//     // createdAt: { type: timestamps,type: String, require: true },
//     // updatedAt: { type: timestamps,type: String, require: true }
// }, { timestamps: true })
 
// module.exports = mongoose.model("Apprentice", apprenticeSchema) 
const mongoose = require('mongoose');

// Importa los helpers para validaciones
// const { validateEmail, validatePhone, validateDocument } = require('../helpers/validationHelpers');

const apprenticeSchema = new mongoose.Schema({
    tpdocument: { 
        type: String, 
        required: [true, 'El tipo de documento es obligatorio'],
        trim: true
    },
    numDocument: { 
        type: String, 
        required: [true, 'El número de documento es obligatorio'],
        trim: true,
        validate: {
            validator: function(v) {
                return validateDocument(v); // Usa el helper para validar
            },
            message: 'Número de documento inválido'
        }
    },
    firstName: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    lastName: { 
        type: String, 
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    phone: { 
        type: Number, 
        required: [true, 'El número de teléfono es obligatorio'],
        validate: {
            validator: function(v) {
                return validatePhone(v); // Usa el helper para validar
            },
            message: 'Número de teléfono inválido'
        }
    },
    email: { 
        type: String, 
        required: [true, 'El correo electrónico es obligatorio'],
        trim: true,
        validate: {
            validator: function(v) {
                return validateEmail(v); // Usa el helper para validar
            },
            message: 'Formato de correo electrónico inválido'
        }
    },
    status: { 
        type: Number, 
        default: 1 
    }
}, { 
    timestamps: true // Añade automáticamente createdAt y updatedAt
});
// Índices únicos
apprenticeSchema.index({ numDocument: 1 }, { unique: true });
apprenticeSchema.index({ phone: 1 }, { unique: true });
apprenticeSchema.index({ email: 1 }, { unique: true });
// Middleware para evitar la modificación manual de createdAt
apprenticeSchema.pre('save', function(next) {
    if (!this.isNew) {
        this.createdAt = this._doc.createdAt;
    }
    next();
});

apprenticeSchema.pre('findOneAndUpdate', function(next) {
    delete this._update.createdAt; // Previene la modificación de createdAt en updates
    next();
});

module.exports = mongoose.model("Apprentice", apprenticeSchema);