const express = require('express');
const followupController = require('../controllers/followup.js'); 
const { validateFields } = require('../middlewares/validate-fields.js'); 
const { validateJWT } = require('../middlewares/validateJWT.js');
const { check } = require('express-validator');

const followupRoute = express.Router();

// Listar todos los seguimientos
followupRoute.get('/listallfollowup', [ 
    validateJWT,
    validateFields
], followupController.getListAllFollowup);

// Listar seguimiento por ID
followupRoute.get('/listfollowupbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], followupController.getListFollowupById);

// Listar seguimientos por asignación
followupRoute.get('/listfollowupbyassignment/:idassignment', [
    validateJWT,
    check('idassignment', 'El idassignment es obligatorio y debe ser un ID de MongoDB válido').isMongoId(), // Corregido "id" a "idassignment"
    validateFields
], followupController.getListFollowUpInstructorByAssignment);

// Listar seguimientos por instructor
followupRoute.get('/listfollowupbyinstructor/:idinstructor', [
    validateJWT,
    check('idinstructor', 'El idinstructor es obligatorio y debe ser un ID de MongoDB válido').isMongoId(), // Corregido "id" a "idinstructor"
    validateFields
], followupController.getListFollowupByInstructor);

// Agregar un seguimiento
followupRoute.post('/addfollowup', [
    validateJWT,
    check('assigment', 'El campo asignaciones es obligatorio').not().isEmpty(),
    check('instructor', 'El campo instructor es obligatorio').not().isEmpty(),
    check('number', 'El campo número es obligatorio').not().isEmpty().isInt(),
    check('month', 'El campo mes es opcional').optional(),
    check('document', 'El campo documento es obligatorio').not().isEmpty(),
    check('status', 'El campo estado es obligatorio').not().isEmpty(),
    check('users', 'El campo Usuario es obligatorio').not().isEmpty(),
    check('observations', 'El campo observaciones es opcional').optional(),
    validateFields
], followupController.postAddFollowup);

// Actualizar seguimiento por ID
followupRoute.put('/updatefollowupbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], followupController.putUpdateFollowupById);

// Habilitar seguimiento por ID
followupRoute.put('/enablefollowupbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], followupController.putEnableFollowup);

// Deshabilitar seguimiento por ID
followupRoute.put('/disablefollowupbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], followupController.putDisableFollowup);

module.exports = followupRoute;
