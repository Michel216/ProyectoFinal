const express = require('express');
const { check } = require('express-validator');
const assigmentHelper = require('../helpers/assignment.js');
const registerHelper = require('../helpers/register.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const assignmentController = require('../controllers/assignment.js');
const { validateFields } = require('./../middlewares/validate-fields.js');

const assignmentRoute = express.Router();

// Obtener todas las asignaciones
assignmentRoute.get('/listallassignment', [
    // validateJWT,
    validateFields
], assignmentController.getListAssignment);

// Obtener asignación por ID
assignmentRoute.get('/listassignmentbyid/:id', [
    // validateJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(assigmentHelper.assignmentIdExists),
    validateFields
], assignmentController.getListAssignmentById);

// Obtener asignaciones por ID de registro
assignmentRoute.get('/listassignmentbyregister/:idregister', [
    validateJWT,
    check('idregister', 'El idregister no es válido').isMongoId(),
    check('idregister').custom(registerHelper.registerExists),
    validateFields
], assignmentController.getListAssignmentByRegister);

// Obtener seguimiento de instructor por ID
assignmentRoute.get('/listfollowupinstructor/:idinstructor', [
    validateJWT,
    check('idinstructor', 'El idinstructor no es válido').isMongoId(),
    validateFields
], assignmentController.getListFollowUpInstructorById);

// Obtener instructor técnico por ID
assignmentRoute.get('/listtechnicalinstructor/:idinstructor', [
    validateJWT,
    check('idinstructor', 'El idinstructor no es válido').isMongoId(),
    validateFields
], assignmentController.getListTechnicalInstructorById);

// Obtener instructor de proyecto por ID
assignmentRoute.get('/listprojectinstructor/:idinstructor', [
    validateJWT,
    check('idinstructor', 'El idinstructor no es válido').isMongoId(),
    validateFields
], assignmentController.getListProjectInstructorById);

// Agregar una nueva asignación
assignmentRoute.post('/addassignment', [
    // validateJWT,
    check('idregister', 'El idregister no es válido').isMongoId(),
    check('idregister').custom(assigmentHelper.registerExists),
    check('certificationdoc', 'El certificationdoc es obligatorio').not().isEmpty(),
    check('judymenthphoto', 'El judymenthphoto debe ser un string').isString(),
    check('observation', 'El observation es obligatorio').not().isEmpty(),
    check('followInstructor', 'El followInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('technicalInstructor', 'El technicalInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('proyectInstructor', 'El proyectInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    assigmentHelper.validateAtLeastOneInstructor(),
    validateFields
], assignmentController.postAddAssignment);

assignmentRoute.post('/sendEmail', [
    // validateJWT,
    validateFields
], assignmentController.postSendEmail)

// Actualizar asignación por ID
assignmentRoute.put('/updateassignmentbyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], assignmentController.putUpdateAssignment);

// Habilitar asignación por ID
assignmentRoute.put('/enableassignmentbyid/:id', [
    // validateJWT,
    check('id', 'El id no es válido').isMongoId(),
    validateFields
], assignmentController.putEnableAssignment);

// Deshabilitar asignación por ID
assignmentRoute.put('/disableassignmentbyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], assignmentController.putDisableAssignment);

module.exports = assignmentRoute;

// "<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="utf-8">
// <title>Error</title>
// </head>
// <body>
// <pre>Cannot PUT /api/assignment/disableassignmentbyid/66e8cf97bb264722a15e9e4f</pre>
// </body>
// </html>
// "