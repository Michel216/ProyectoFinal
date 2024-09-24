const Binnacle = require("../models/binnacleEp.js")
const Assignment = require('../models/assignment.js');
const UserEp = require("../models/userEp.js")
// const Instructor = require('../models/instructor.js');

const binnacleHelper = {
    // valida que exista el Id en la base de datos
    validateId: async (id) => {
        let existsId = await Binnacle.findById(id)
        if (!existsId) {
            throw new Error("La bitácora no existe en la base de datos")
        }
    },
    // valida que exista la asignación en la base de datos
    validateAssignment: async (assignment) => {
        let existsAssignment = await Assignment.findById(assignment)
        if (!existsAssignment) {
            throw new Error("La asignación no existe en la base de datos")
        }
    },
    // valida que exista el usuario en la base de datos
    // validateUserEp: async (userEp) => {
    //     let existsUserEp = await UserEp.findById(userEp)
    //     if (!existsUserEp) {
    //         throw new Error("La asignación no existe en la base de datos")
    //     }
    // },
    // valida que exista el instructor en la base de datos
    // validateInstructor: async (instructor) => {
    //     let existsInstructor = await Instructor.findById(instructor)
    //     if (!existsInstructor) {
    //         throw new Error("El instructor no existe en la base de datos")
    //     }
    // },
    // valida que el número de la bitácora sea de 1 a 12
    validateNumber: (number) => {
        if (number < 1 || number > 12) {
            throw new Error("El número de la bitácora debe ser de 1 a 12")
        } else {
            return true
        }
    },
    // valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4
    validateStatus: (status) => {
        if (status < 1 || status > 4) {
            throw new Error("El número de la bitácora debe ser de 1 a 4")
        } else {
            return true
        }
    }
}
module.exports = binnacleHelper ;