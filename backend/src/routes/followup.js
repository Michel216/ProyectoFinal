const express = require('express');
const followupController = require('../controllers/followup.js'); 
const { validateFields } = require('../middlewares/validate-fields.js'); 
const { validateRepforaJWT } = require('./../middlewares/validateJWTRepfora.js');
const { check } = require('express-validator');
const followUpHelper =require('../helpers/followup.js');

const followupRoute = express.Router();
 
// Listar todos los seguimientos
followupRoute.get('/listallfollowup', [
    validateRepforaJWT,
    validateFields
], followupController.getListAllFollowup);

// Listar seguimiento por ID
followupRoute.get('/listfollowupbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(followUpHelper.validateId),
    validateFields
], followupController.getListFollowupById);

// Listar seguimientos por asignación
followupRoute.get('/listfollowupbyassignment/:idRegister', [
    validateRepforaJWT,
    check('idRegister', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('idRegister').custom(followUpHelper.validateRegister),
    check('idRegister').custom(followUpHelper.validateAssignment),
    validateFields
], followupController.getListFollowUpByAssignment);

// Listar seguimientos por instructor
followupRoute.get('/listfollowupbyinstructor/:idInstructor', [
    validateRepforaJWT,
    check('idInstructor', 'El idInstructor es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], followupController.getListFollowupByInstructor);

// Agregar un seguimiento
followupRoute.post('/addfollowup', [
    validateRepforaJWT,
    check('assignment', 'El campo asignaciones es obligatorio').notEmpty(),
    check('assignment').custom(followUpHelper.validateRegister),
    check('assignment').custom(followUpHelper.validateAssignment),
    check('instructor', 'El campo instructor es obligatorio').notEmpty(),
    check('number', 'El campo número es obligatorio y debe ser un número entero').isNumeric(),
    check('number').custom(followUpHelper.validateNumber),
    check('month', 'El campo mes es obligatorio y debe ser un mes válido').notEmpty(),
    check('document', 'El campo documento es obligatorio').notEmpty(),
    check('status').optional().custom(followUpHelper.validateStatus),
    validateFields
], followupController.postAddFollowup);

// añadir observación
followupRoute.put("/addobservation/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(followUpHelper.validateId),
    check('observations', 'Las observaciones son obligatorias').notEmpty(),
    check('observations.*.observation', 'Cada observación es obligatoria').notEmpty(),
    check('observations.*.user', 'El usuario en cada observación es obligatorio').notEmpty(),
    check('observations.*.observationDate', 'La fecha en cada observación es obligatoria y debe ser una fecha válida').notEmpty(),
    validateFields
], followupController.putAddObservation)

// Modificar estado de segimiento
followupRoute.put('/updatestatus/:id/:status', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(followUpHelper.validateId),
    check('status', 'El campo estado es obligatorio').notEmpty(),
    check('status').custom(followUpHelper.validateStatus),
    validateFields
], followupController.putUpdateStatus);

module.exports = followupRoute;
 