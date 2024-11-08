const { check } = require('express-validator');
const Register = require("../models/register.js")

const validateDateRange = () => {
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

const registerExists = async (id) => {
    try {
        const exist = await Register.findById(id);

        if (!exist) {
            throw new Error(`El ID: ${id} no está registrado`);
        }

        return exist;
    } catch (error) {
        throw new Error(`Error al verificar el ID: ${error.message}`);
    }
};
const verifyDocAlternative= async (docAlternative) => {
    try {
        const url = docAlternative;

        const isOneDriveLink = (url) => {
            const regex = /^https?:\/\/(www\.)?(onedrive\.live\.com|1drv\.ms)(\/.*)?$/;
            return regex.test(url);
        };

        if (!isOneDriveLink(url)) {
            throw new Error("El enlace proporcionado no es válido. Debe ser un enlace de OneDrive.");
        }

        console.log("El contenido es un enlace válido de OneDrive.");
        return true;
    } catch (error) {
        throw new Error(error.message || "Error al verificar el enlace de OneDrive.");
    }
}
module.exports = {
    validateDateRange,
    // validateCreateRegister,
    // validateUpdateRegister,
    verifyDocAlternative,
    registerExists
};