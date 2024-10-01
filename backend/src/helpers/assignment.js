const { body } = require('express-validator');
const Assignment = require('../models/assignment.js')

const assigmentHelper = {
    assignmentIdExists: async (id) => {
        try {
            const exists = await Assignment.findById(id);
    
            if (!exists) {
                throw new Error(`No se encontró la asignación con el ID ${id}`);
            }
    
            return exists;
        } catch (error) {
            throw new Error(`Error al buscar la asignación por ID: ${error.message}`);
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