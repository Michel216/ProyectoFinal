const express = require('express');
const apprenticeController = require('../controllers/apprentice.js');
const apprenticeHelper = require('./../helpers/apprentice.js');
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const { check } = require('express-validator');

const apprenticeRoute = express.Router();

// Obtener todos los aprendices
apprenticeRoute.get('/listallapprentice', [
    // validateJWT,
    validateFields
], apprenticeController.getListApprentices);

// Obtener aprendices por ID
apprenticeRoute.get('/listapprenticebyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    validateFields
], apprenticeController.getListApprenticesById);

// Obtener aprendices por ficha
apprenticeRoute.get('/listapprenticebyfiche/:idFiche', [
    // validateJWT,
    check('idFiche', 'El id de la ficha es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], apprenticeController.getListApprenticesByFiche);

// Obtener aprendices por estados
apprenticeRoute.get('/listapprenticebystatus/:status', [
    // validateJWT,
    check('status', 'El estado es obligatorio').notEmpty(),
    // check('status').custom(apprenticeHelper.validateStatus),
    validateFields
], apprenticeController.getListApprenticeByStatus);

// Añadir aprendiz
apprenticeRoute.post('/addapprentice', [
    // validateJWT,
    check('tpdocument', 'El tipo de documento es obligatorio').notEmpty(),
    check('tpdocument').custom(apprenticeHelper.validateTpDocument),
    check('numDocument','El número docuemnto es obligatorio').notEmpty(),
    check('numDocument').custom(apprenticeHelper.validateNumDocument),
    check('numDocument','El número docuemnto debe tener mínimo 8 y maximo 10 caracteres').isLength({min:8, max: 10}),
    check('firstName','El nombre es obligatorio').notEmpty(),
    check('lastName','El apellido es obligatorio').notEmpty(),    
    check('phone','El teléfono es obligatorio').notEmpty(),
    check('phone','El número debe tener 10 digitos').isLength({ min: 10}),
    check('phone','El teléfono es obligatorio').isMobilePhone(),
    check('phone').custom(apprenticeHelper.validatePhone),
    check('email','El correo electrónico es obligatorio').notEmpty(),
    check('email','El correo debe ser válido').isEmail(),
    check('email').custom(apprenticeHelper.validateEmail),
    check('fiche','La ficha debe ser obligatoria').notEmpty(),
    validateFields
], apprenticeController.postAddAprentice);

// Actualizar aprendiz por ID (Solo valida ID y updatedAt)
apprenticeRoute.put('/updateapprenticebyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    check('numDocument','El número docuemnto es obligatorio').notEmpty().optional(),
    check('numDocument').optional().custom(apprenticeHelper.validateNumDocument),
    check('phone','El teléfono es obligatorio').isMobilePhone().optional(),
    check('phone').optional().custom(apprenticeHelper.validatePhone),
    check('email','El correo debe ser válido').isEmail().optional(),
    check('email').optional().custom(apprenticeHelper.validateEmail),
    validateFields
], apprenticeController.putUpdateApprentice);

// Habilitar aprendiz por ID
apprenticeRoute.put('/enableapprentice/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    validateFields
], apprenticeController.putEnableApprentice);

// Deshabilitar aprendiz por ID
apprenticeRoute.put('/disableapprentice/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    validateFields
], apprenticeController.putDisableApprentice);

module.exports = apprenticeRoute;
