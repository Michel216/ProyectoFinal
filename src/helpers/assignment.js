const { body } = require('express-validator');
const Assignment = require('../models/assignment.js')

const assigmentHelper = {
    validateAssignment: async (id) => {
        // Valida que exista el Id del aprendiz en la base de datos
        let existAssignment = await Assignment.findById(id);
        if (!existAssignment) {
            throw new Error("La asignación no existe");
        }
    },
    validateAtLeastOneInstructor: () => {
        return body().custom((value, { req }) => {
            const { followInstructor, technicalInstructor, proyectInstructor } = req.body;
            if (!followInstructor && !technicalInstructor && !proyectInstructor) {
                throw new Error('Debe asignar al menos un instructor.');
            }
            return true;
        });
    }

}
module.exports =assigmentHelper;