const { body } = require('express-validator');
const Modality = require("./../models/modality.js")


const modalityHelper = {
    // valida que exista el Id en la base de datos
    validateId: async (id) => {
        let existsId = await Modality.findById(id)
        if (!existsId) {
            throw new Error("La modalidad no existe en la base de datos")
        }
    },
    // valida al menos la hora de un instructor
    validateAtLeastOneInstructorHour: () => {
        return body().custom((value, { req }) => {
            const { hourInstructorFollow, hourInstructorTechnical, hourInstructorProject } = req.body;
            if (!hourInstructorFollow && !hourInstructorTechnical && !hourInstructorProject) {
                throw new Error('Debe asignar al menos la hora un instructor.');
            } else if (hourInstructorFollow == 0 || hourInstructorTechnical == 0 || hourInstructorProject == 0) {
                throw new Error('Debe asignar al menos la hora un instructor.');
            } else {
                return true
            }
        });
    }
}

module.exports = modalityHelper; 