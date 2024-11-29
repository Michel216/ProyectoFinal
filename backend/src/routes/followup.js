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
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('id').custom(followUpHelper.validateId),
    validateFields
], followupController.getListFollowupById);

// Listar seguimientos por asignación
followupRoute.get('/listfollowupbyassignment/:idAssignment', [
    validateRepforaJWT,
    check('idRegister', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('idRegister').custom(followUpHelper.validateRegister),
    check('idRegister').custom(followUpHelper.validateAssignment),
    validateFields
], followupController.getListFollowUpByAssignment);

// Listar seguimientos por instructor
followupRoute.get('/listfollowupbyinstructor/:idInstructor', [
    validateRepforaJWT,
    check('idInstructor', 'El idInstructor es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    validateFields
], followupController.getListFollowupByInstructor);

// Agregar un seguimiento
followupRoute.post('/addfollowup', [
    validateRepforaJWT,
    check('assignment', 'El campo asignaciones es obligatorio').notEmpty().trim(),
    check('assignment').custom(followUpHelper.validateRegister),
    check('assignment').custom(followUpHelper.validateAssignment),
    check('instructor', 'El campo instructor es obligatorio').notEmpty().trim(),
    check('number', 'El campo número es obligatorio y debe ser un número entero').isNumeric().trim(),
    check('number').custom(followUpHelper.validateNumber),
    check('month', 'El campo mes es obligatorio y debe ser un mes válido').notEmpty().trim(),
    check('document', 'El campo documento es obligatorio').notEmpty().trim(),
    check('status').optional().custom(followUpHelper.validateStatus),
    validateFields
], followupController.postAddFollowup);

// // Actualizar seguimiento por ID
// followupRoute.put('/updatefollowupbyid/:id', [
//     validateRepforaJWT,
//     check('assignment', 'El campo asignaciones es obligatorio').notEmpty().trim(),
//     check('assignment','El campo debe ser un mongoId').isMongoId().trim(),
//     check('instructor', 'El campo instructor es obligatorio').notEmpty().trim(),
//     check('instructor','El campo debe ser un mongoId').isMongoId().trim(),
//     check('number', 'El campo número es obligatorio y debe ser un número entero').isNumeric().trim(),
//     check('month', 'El campo mes es obligatorio y debe ser un mes válido').not().isEmpty().trim(),
//     check('document', 'El campo documento es obligatorio').notEmpty().trim(),
//     // check('status', 'El campo estado es obligatorio').notEmpty(),
//     check('users', 'El campo Usuario es obligatorio').notEmpty().trim(),
//     check('observations', 'El campo observaciones es obligatorio').notEmpty(),
//     check('id').custom(followUpHelper.validateId).trim(),
//     // Validar que `createdAt` no esté incluido en los campos a actualizar
//     validateFields
// ], followupController.putUpdateFollowupById);

followupRoute.put("/addobservation/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(followUpHelper.validateId),
    check('observations', 'Las observaciones son obligatorias').notEmpty().trim(),
    check('observations.*.observation', 'Cada observación es obligatoria').notEmpty().trim(),
    check('observations.*.user', 'El usuario en cada observación es obligatorio').notEmpty().trim(),
    check('observations.*.observationDate', 'La fecha en cada observación es obligatoria y debe ser una fecha válida').notEmpty().trim(),
    validateFields
], followupController.putAddObservation)

// Modificar estado de segimiento
followupRoute.put('/updatestatus/:id/:status', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('status', 'El campo estado es obligatorio').notEmpty().trim(),
    check('id').custom(followUpHelper.validateId).trim(),
    validateFields
], followupController.putUpdateStatus);

module.exports = followupRoute;
 