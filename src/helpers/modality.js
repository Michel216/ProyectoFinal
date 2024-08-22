const Modality = require("./../models/modality.js")
const { body } = require('express-validator');

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
            const { hourinstructorfollow, hourinstructortechnical, hourinstructorproject } = req.body;
            if (!hourinstructorfollow && !hourinstructortechnical && !hourinstructorproject) {
                throw new Error('Debe asignar al menos la hora un instructor.');
            }
            return true;
        });
    }
}

module.exports = modalityHelper; 