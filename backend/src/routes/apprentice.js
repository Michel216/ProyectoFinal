const express = require('express');
const apprenticeController = require('../controllers/apprentice.js');
const apprenticeHelper = require('./../helpers/apprentice.js');
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const { check } = require('express-validator');

const apprenticeRoute = express.Router();

// Obtener todos los aprendices
apprenticeRoute.get('/listallapprentice', [
    validateJWT,
    validateFields
], apprenticeController.getListApprentices);

// Obtener aprendices por ID
apprenticeRoute.get('/listapprenticebyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('id').custom(apprenticeHelper.validateApprentice).trim(),
    validateFields
], apprenticeController.getListApprenticesById);

// Obtener aprendices por ficha
apprenticeRoute.get('/listapprenticebyfiche/:idFiche', [
    validateJWT,
    check('idFiche', 'El id de la ficha es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('idFiche').custom(apprenticeHelper.validateFiche),
    validateFields
], apprenticeController.getListApprenticesByFiche);

// Obtener aprendices por estados
apprenticeRoute.get('/listapprenticebystatus/:idApprentice/:status', [
    validateJWT,
    check('idApprentice').custom(apprenticeHelper.validateApprentice).trim(),
    check('status', 'El estado es obligatorio').notEmpty().trim(),
    check('status').custom(apprenticeHelper.validateStatus),
    validateFields
], apprenticeController.getListApprenticeByStatus);

// Añadir aprendiz
apprenticeRoute.post('/addapprentice', [
    validateJWT,
    check('tpdocument', 'El tipo de documento es obligatorio').notEmpty().trim(),
    check('tpdocument').custom(apprenticeHelper.validateTpDocument).trim(),
    check('numDocument','El número docuemnto es obligatorio').notEmpty().trim(),
    check('numDocument').custom(apprenticeHelper.validateNumDocument).trim(),
    check('numDocument','El número docuemnto debe tener mínimo 8 y maximo 10 caracteres').isLength({min:8, max: 10}).trim(),
    check('firstName','El nombre es obligatorio').notEmpty().trim(),
    check('lastName','El apellido es obligatorio').notEmpty().trim(),
    check('phone','El teléfono es obligatorio').notEmpty().trim(),
    check('phone','El número debe tener 10 digitos').isLength({ min: 10, max:10}).trim(),
    check('phone','El teléfono es obligatorio').isMobilePhone().trim(),
    check('phone').custom(apprenticeHelper.validatePhone).trim(),
    check('email','El correo electrónico es obligatorio').notEmpty().trim(),
    check('email','El correo debe ser válido').isEmail().trim(),
    check('email').custom(apprenticeHelper.validateEmail).trim(),
    check('fiche','La ficha debe ser obligatoria').notEmpty().trim(),
    // check('fiche').custom(apprenticeHelper.validateFiche),
    validateFields
], apprenticeController.postAddAprentice);

//Login para el aprendiz
apprenticeRoute.post('/loginapprentice', [
    check('email','El correo electrónico es obligatorio').notEmpty().trim(),
    check('email','El correo debe ser válido').isEmail().trim(),
    check('numDocument','El número docuemnto es obligatorio').notEmpty().trim(),
    check('numDocument').custom(apprenticeHelper.validateNumDocument).trim()
    ], apprenticeController.postLoginApprentice);
    
// Actualizar aprendiz por ID (Solo valida ID y updatedAt)
apprenticeRoute.put('/updateapprenticebyid/:id', [
    validateJWT,
    check('tpdocument', 'El tipo de documento es obligatorio').notEmpty().trim(),
    // check('tpdocument').custom(apprenticeHelper.validateTpDocument).trim(),
    check('numDocument','El número docuemnto es obligatorio').notEmpty().trim(),
    // check('numDocument').custom(apprenticeHelper.validateNumDocument).trim(),
    check('numDocument','El número docuemnto debe tener mínimo 8 y maximo 10 caracteres').isLength({min:8, max: 10}).trim(),
    check('numDocument').custom(async (numDocument, { req }) => {
        await apprenticeHelper.validateNumDocumentIfIsDiferent(numDocument, req.params.id);
    }),
    check('firstName','El nombre es obligatorio').notEmpty().trim(),
    check('lastName','El apellido es obligatorio').notEmpty().trim(),
    check('phone','El teléfono es obligatorio').notEmpty().trim(),
    check('phone','El número debe tener 10 digitos').isLength({ min: 10, max:10}).trim(),
    check('phone','El teléfono es obligatorio').isMobilePhone().trim(),
    check('phone').custom(async (phone, { req }) => {
        await apprenticeHelper.validatePhoneIfIsDifferent(phone, req.params.id);
    }),
    // check('phone').custom(apprenticeHelper.validatePhone).trim(),
    check('email','El correo electrónico es obligatorio').notEmpty().trim(),
    check('email','El correo debe ser válido').isEmail().trim(),
    check('email').custom(async (email, { req }) => {
        await apprenticeHelper.validateEmailIfIsDifferent(email, req.params.id);
    }),
    // check('email').custom(apprenticeHelper.validateEmail).trim(),
    check('fiche','La ficha debe ser obligatoria').notEmpty().trim(),
    validateFields
], apprenticeController.putUpdateApprentice);

// Habilitar aprendiz por ID
apprenticeRoute.put('/enableapprentice/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('id').custom(apprenticeHelper.validateApprentice).trim(),
    validateFields
], apprenticeController.putEnableApprentice);

// Deshabilitar aprendiz por ID
apprenticeRoute.put('/disableapprentice/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId().trim(),
    check('id').custom(apprenticeHelper.validateApprentice).trim(),
    validateFields
], apprenticeController.putDisableApprentice);

module.exports = apprenticeRoute;
