const Binnacle = require("../models/binnacleEp.js")
// const Assignment = require('../models/assignment.js');
// const UserEp = require("../models/userEp.js")
// const axios = require('axios');



const binnacleHelper = {
    // valida que exista el Id en la base de datos
    validateId: async (id) => {
        let existsId = await Binnacle.findById(id)
        if (!existsId) {
            throw new Error("La bitácora no existe en la base de datos")
        }
    },
    // valida que exista la asignación en la base de datos
    // validateAssignment: async (assignment) => {
    //     let existsAssignment = await Assignment.findById(assignment)
    //     if (!existsAssignment) {
    //         throw new Error("La asignación no existe en la base de datos")
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
    // valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4, Verificado técnico: 5, Verificado proyecto: 6
    validateStatus: (status) => {
        if (status < 1 || status > 6) {
            throw new Error("El número de la bitácora debe ser de 1 a 6")
        } else {
            return true
        }
    }
}
module.exports = binnacleHelper ;