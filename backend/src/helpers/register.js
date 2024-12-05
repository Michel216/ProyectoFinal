const { check } = require('express-validator');
const Register = require("../models/register.js")
const Apprentice = require("../models/apprentice.js");
const Modality = require("./../models/modality.js")
const { body } = require('express-validator');

const registerHelper = {
    validateId: async (id) => {
        const exist = await Register.findById(id);
        if (!exist) {
            throw new Error(`El ID no está registrado`);
        } return true;
    },
    validateModality: async (idmodality) => {
        const existModality = await Modality.findById(idmodality)
        if (!existModality) {
            throw new Error(`La modalidad no está en a base de datos`);
        } return true
    },
    validateApprentice: async (idapprentice) => {
        const existApprentice = await Apprentice.findById(idapprentice)
        if (!existApprentice) {
            throw new Error(`El aprendiz no está en a base de datos`);
        } return true
    },
    verifyDocAlternative: async () => {
        try {
            const url = docAlternative;
    
            const isOneDriveLink = (url) => {
                const regex = /^https?:\/\/(www\.)?(onedrive\.live\.com|1drv\.ms)(\/.*)?$/;
                return regex.test(url);
            };
    
            if (!isOneDriveLink(url)) {
                throw new Error("El enlace proporcionado no es válido. Debe ser un enlace de OneDrive.");
            }
            
            return true;
        } catch (error) {
            throw new Error(error.message || "Error al verificar el enlace de OneDrive.");
        }
    }
}

async function validateDateRange() {
    return [
        check('startDate', 'El campo startDate es obligatorio y debe ser una fecha válida').isDate(),
        check('endDate', 'El campo endDate es obligatorio y debe ser una fecha válida').isDate(),
        check('startDate').custom((value, { req }) => {
            if (new Date(value) > new Date(req.body.endDate)) {
                throw new Error('La fecha de inicio debe ser anterior a la fecha de fin.');
            }
            return true;
        })
    ];
};

// function validateCreateRegister(data) {
//     const { createdAt, updatedAt } = data;

//     if (!createdAt || !updatedAt) {
//         return {
//             valid: false,
//             message: 'Los campos createdAt y updatedAt son obligatorios.'
//         };
//     }

//     return { valid: true };
// }

// Validación de campos obligatorios para la actualización
// function validateUpdateRegister(data) {
//     const { updatedAt } = data;

//     if (!updatedAt) {
//         return {
//             valid: false,
//             message: 'El campo updatedAt es obligatorio al actualizar.'
//         };
//     }

//     return { valid: true };
// }

function validateAtLeastOneInstructor() {
    return body().custom((value, { req }) => {
        const { followInstructor, technicalInstructor, proyectInstructor } = req.body;
        if (!followInstructor && !technicalInstructor && !proyectInstructor) {
            throw new Error('Debe asignar al menos un instructor.');
        }
        return true;
    });
}
module.exports = {registerHelper, validateDateRange, validateAtLeastOneInstructor};