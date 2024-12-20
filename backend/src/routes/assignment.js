const express = require('express');
const { check } = require('express-validator');
const registerHelper = require('../helpers/register.js');
const { validateRepforaJWT } = require('./../middlewares/validateJWTRepfora.js');
const { validateFields } = require('./../middlewares/validate-fields.js');

const assignmentRoute = express.Router();

// Obtener todas las asignaciones
assignmentRoute.get('/listallassignment', [
    validateRepforaJWT,
    validateFields
], assignmentController.getListAssignment);

// Obtener asignación por ID
assignmentRoute.get('/listassignmentbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(assigmentHelper.assignmentIdExists),
    validateFields
], assignmentController.getListAssignmentById);

// Obtener asignaciones por ID de registro
assignmentRoute.get('/listassignmentbyregister/:idregister', [
    validateRepforaJWT,
    check('idregister', 'El idregister no es válido').isMongoId(),
    check('idregister').custom(registerHelper.registerExists),
    validateFields
], assignmentController.getListAssignmentByRegister);

// Obtener seguimiento de instructor por ID
assignmentRoute.get('/listfollowupinstructor/:idinstructor', [
    validateRepforaJWT,
    check('idinstructor', 'El idinstructor no es válido').isMongoId(),
    validateFields
], assignmentController.getListFollowUpInstructorById);

// Obtener instructor técnico por ID
assignmentRoute.get('/listtechnicalinstructor/:idinstructor', [
    validateRepforaJWT,
    check('idinstructor', 'El idinstructor no es válido').isMongoId(),
    validateFields
], assignmentController.getListTechnicalInstructorById);

// Obtener instructor de proyecto por ID
assignmentRoute.get('/listprojectinstructor/:idinstructor', [
    validateRepforaJWT,
    check('idinstructor', 'El idinstructor no es válido').isMongoId(),
    validateFields
], assignmentController.getListProjectInstructorById);

// Agregar una nueva asignación
assignmentRoute.post('/addassignment', [
    validateRepforaJWT,
    check('register', 'El idregister no es válido').isMongoId(),
    check('register').custom(registerHelper.registerExists),
    check('certificationdoc', 'El certificationdoc es obligatorio').not().isEmpty(),
    check('judymenthphoto', 'El judymenthphoto debe ser un string').isString(),
    // check('observation', 'El observation es obligatorio').not().isEmpty(),
    check('followInstructor', 'El followInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('technicalInstructor', 'El technicalInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('proyectInstructor', 'El proyectInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    assigmentHelper.validateAtLeastOneInstructor(),
    validateFields
], assignmentController.postAddAssignment);

assignmentRoute.post('/sendEmail', [
    validateRepforaJWT,
    validateFields
], assignmentController.postSendEmail)

// Actualizar asignación por ID
assignmentRoute.put('/updateassignmentbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], assignmentController.putUpdateAssignment);

// Habilitar asignación por ID
assignmentRoute.put('/enableassignmentbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id no es válido').isMongoId(),
    validateFields
], assignmentController.putEnableAssignment);

// Deshabilitar asignación por ID
assignmentRoute.put('/disableassignmentbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], assignmentController.putDisableAssignment);

// module.exports = assignmentRoute;

