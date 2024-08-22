const { check } = require('express-validator');

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

function validateCreateRegister(data) {
    const { createdAt, updatedAt } = data;

    if (!createdAt || !updatedAt) {
        return {
            valid: false,
            message: 'Los campos createdAt y updatedAt son obligatorios.'
        };
    }

    return { valid: true };
}

// Validación de campos obligatorios para la actualización
function validateUpdateRegister(data) {
    const { updatedAt } = data;

    if (!updatedAt) {
        return {
            valid: false,
            message: 'El campo updatedAt es obligatorio al actualizar.'
        };
    }

    return { valid: true };
}

module.exports = {
    validateDateRange,
    validateCreateRegister,
    validateUpdateRegister

};