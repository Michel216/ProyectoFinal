const express = require('express');
const followupController = require('../controllers/followup.js'); 
const { validateFields } = require('../middlewares/validate-fields.js'); 
const assigmentHelper = require('../helpers/assignment.js');
// const { validateJWT } = require('../middlewares/validateJWT.js');
const { check } = require('express-validator');
const followUpHelper =require('../helpers/followup.js');

const followupRoute = express.Router();
 
// Listar todos los seguimientos
followupRoute.get('/listallfollowup', [
    // validateJWT,
    validateFields
], followupController.getListAllFollowup);

// Listar seguimiento por ID
followupRoute.get('/listfollowupbyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('id').custom(followUpHelper.validateId).trim(),
    validateFields
], followupController.getListFollowupById);

// Listar seguimientos por asignación
followupRoute.get('/listfollowupbyassignment/:idAssignment', [
    // validateJWT,
    check('idAssignment', 'El idAssignment es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('idAssignment').custom(followUpHelper.validateAssignment),
    check('idAssignment').custom(followUpHelper.validateAssignment),
    validateFields
], followupController.getListFollowUpInstructorByAssignment);

// Listar seguimientos por instructor
followupRoute.get('/listfollowupbyinstructor/:idinstructor', [
    // validateJWT,
    check('idinstructor', 'El idinstructor es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('idInstructor').custom(followUpHelper.validateInstrustor),
    validateFields
], followupController.getListFollowupByInstructor);

// Agregar un seguimiento
followupRoute.post('/addfollowup', [
    // validateJWT,
    check('assignment', 'El campo asignaciones es obligatorio').notEmpty().trim(),
    check('assignment','El campo debe ser un mongoId').isMongoId().trim(),
    check('instructor', 'El campo instructor es obligatorio').notEmpty().trim(),
    check('instructor','El campo debe ser un mongoId').isMongoId().trim(),
    check('instructor').custom(followUpHelper.validateInstrustor),
    check('instructor').custom(followUpHelper.validateInstrustor),
    check('number', 'El campo número es obligatorio y debe ser un número entero').isNumeric().trim(),
    check('month', 'El campo mes es obligatorio y debe ser un mes válido').not().isEmpty().trim(),
    check('document', 'El campo documento es obligatorio').notEmpty().trim(),
    check('status', 'El campo estado es obligatorio').notEmpty(),
    check('status').custom(followUpHelper.validateStatus),
    check('users', 'El campo Usuario es obligatorio').notEmpty().trim(),
    check('observations', 'El campo observaciones es obligatorio').notEmpty(),
    validateFields
], followupController.postAddFollowup);

// Actualizar seguimiento por ID
followupRoute.put('/updatefollowupbyid/:id', [
    // validateJWT,
    check('assignment', 'El campo asignaciones es obligatorio').notEmpty().trim(),
    check('assignment','El campo debe ser un mongoId').isMongoId().trim(),
    check('instructor', 'El campo instructor es obligatorio').notEmpty().trim(),
    check('instructor','El campo debe ser un mongoId').isMongoId().trim(),
    check('number', 'El campo número es obligatorio y debe ser un número entero').isNumeric().trim(),
    check('month', 'El campo mes es obligatorio y debe ser un mes válido').not().isEmpty().trim(),
    check('document', 'El campo documento es obligatorio').notEmpty().trim(),
    // check('status', 'El campo estado es obligatorio').notEmpty(),
    check('users', 'El campo Usuario es obligatorio').notEmpty().trim(),
    check('observations', 'El campo observaciones es obligatorio').notEmpty(),
    check('id').custom(followUpHelper.validateId).trim(),
    // Validar que `createdAt` no esté incluido en los campos a actualizar
    validateFields
], followupController.putUpdateFollowupById);

// Modificar estado de segimiento
followupRoute.put('/updatestatus/:id/:status', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('status', 'El campo estado es obligatorio').notEmpty().trim(),
    check('id').custom(followUpHelper.validateId).trim(),
    validateFields
], followupController.putUpdateStatus);

module.exports = followupRoute;
 