const Followup = require("../models/followup.js")
const Register = require("../models/register.js")

const followUpHelper = {
    // valida que el seguimiento exista en la base de datos
    validateId: async (id) => {
        let existsId = await Followup.findById(id)
        if (!existsId) {
            throw new Error("El seguimiento no existe en la base de datos")
        } return true
    },
    // validar que el estado esté permitido
    validateStatus: (status) => {
        const Status = [1, 2, 3, 4, 5, 6];
        if (!Status.includes(status)) {
            throw new Error("El estado debe ser 1, 2, 3, 4, 5, 6");
        }
        return true;
    },
    // validar que el número de seguimiento esté permitido
    validateNumber: (number) => {
        if (number < 1 || number > 3) {
            throw new Error("El número del seguimiento debe ser de 1 a 3")
        } else {
            return true
        }
    },
    // valida que el registro exista en la base de datos
    validateRegister: async (idRegister) => {
        const existRegister = await Register.findById(idRegister)
        if (!existRegister) {
            throw new Error("El registro no existe en la base de datos")
        }  else if (existRegister.status === 0) {
            throw new Error("El registro no está activo")
        } return true
    },
    // Valida que el registro tenga alguna asignación
    validateAssignment: async (idRegister) => {
        const existRegister = await Register.findById(idRegister)
        if (existRegister.assignment.length < 0) {
            throw new Error("El registro no tiene asignación")
        } return true
    }
}

module.exports = followUpHelper;