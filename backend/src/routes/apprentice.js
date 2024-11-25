const express = require('express');
const apprenticeController = require('../controllers/apprentice.js');
const apprenticeHelper = require('./../helpers/apprentice.js');
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const { check } = require('express-validator');
const fs = require('fs');  // Asegúrate de incluir esto al principio del archivo

const upload = require('../middlewares/uploadMiddleware');

const apprenticeRoute = express.Router();

// Obtener todos los aprendices
apprenticeRoute.get('/listallapprentice', [
    // validateJWT,
    validateFields
], apprenticeController.getListApprentices);

apprenticeRoute.get('/listcertificatedapprentice', [
    // validateJWT,
    validateFields
], apprenticeController.getListCertificatedApprentice);

apprenticeRoute.get('/searchapprentice', [
    // validateJWT,
    validateFields
], apprenticeController.getFilterApprentices);

// Obtener a un aprendiz por ID
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
    // check('idFiche').custom(apprenticeHelper.validateFiche),
    validateFields
], apprenticeController.getListApprenticesByFiche);

// Obtener aprendices por estado
apprenticeRoute.get('/listapprenticebystatus/:status', [
    // validateJWT,
    check('status', 'El estado es obligatorio y debe ser número').notEmpty().isNumeric(),
    check('status', "El estado debe ser 0 a 4").isInt({ min: 0, max: 4 }),
    validateFields
], apprenticeController.getListApprenticeByStatus);

// Ruta para subir el archivo
apprenticeRoute.post('/upload', upload.single('file'), [
    // validateJWT,

    // check('tpdocument').custom(apprenticeHelper.validateTpDocument),
    // check('numDocument').custom(apprenticeHelper.validateNumDocument),
    // check('phone').custom(apprenticeHelper.validatePhone),
    // check('institutionalEmail').custom(apprenticeHelper.validateInstitutionalEmail),
    // check('personalEmail').custom(apprenticeHelper.validatePersonalEmail),
    // check('modality').custom(apprenticeHelper.validateModality),
    // check('modality').custom(apprenticeHelper.validateModalityStatus),
    // check('status', "El estado debe ser 0 a 4").isInt({ min: 0, max: 4 }),
    validateFields
], apprenticeController.postUploadFile);

// Añadir aprendiz
apprenticeRoute.post('/addapprentice',[
    // validateJWT,
    check('tpdocument', 'El tipo de documento es obligatorio').notEmpty(),
    check('tpdocument').custom(apprenticeHelper.validateTpDocument),
    check('numDocument', 'El número docuemnto es obligatorio').notEmpty(),
    check('numDocument').custom(apprenticeHelper.validateNumDocument),
    check('numDocument', 'El número docuemnto debe tener mínimo 8 y maximo 10 caracteres').isLength({ min: 8, max: 10 }),
    check('firstName', 'El nombre es obligatorio y debe ser una línea de texto').notEmpty().isString().isLength({min: 2, max: 50}),
    check('lastName', 'El apellido es obligatorio y debe ser una línea de texto').notEmpty().isString().isLength({min: 2, max: 50}),
    check('phone', 'El teléfono es obligatorio').notEmpty(),
    check('phone', 'El teléfono debe ser válido').isMobilePhone(),
    check('phone').custom(apprenticeHelper.validatePhone),
    check('institutionalEmail', 'El correo institucional es obligatorio').notEmpty(),
    check('institutionalEmail', 'El correo institucional debe ser válido').isEmail(),
    check('institutionalEmail').custom(apprenticeHelper.validateInstitutionalEmail),
    check('personalEmail', 'El correo personal es obligatorio').notEmpty(),
    check('personalEmail', 'El correo personal debe ser válido').isEmail(),
    check('personalEmail').custom(apprenticeHelper.validatePersonalEmail),
    check('fiche', 'La ficha debe ser obligatoria').notEmpty(),
    check('fiche', 'El Id de la ficha debe ser válido').isMongoId(),
    check('modality', 'La modalidad debe ser obligatoria').notEmpty(),
    check('modality', 'El Id de la modalidad debe ser válido').isMongoId(),
    check('modality').custom(apprenticeHelper.validateModality),
    check('modality').custom(apprenticeHelper.validateModalityStatus),
    check('status', "El estado debe ser 0 a 4").optional().isInt({ min: 0, max: 4 }),
    validateFields
], apprenticeController.postAddAprentice);

//Login para el aprendiz
apprenticeRoute.post('/loginapprentice', [
    check('institutionalEmail', 'El correo electrónico es obligatorio').notEmpty(),
    check('institutionalEmail', 'El correo electrónico debe ser válido').isEmail(),
    check('numDocument', 'El número de documento es obligatorio').notEmpty(),
    check('numDocument', 'El número de documento debe ser una cadena de caracteres').isString(),
    check('numDocument').custom(async (numDocument, { req }) => {
        const { institutionalEmail } = req.body;
        await apprenticeHelper.validateLogin(numDocument, institutionalEmail); // Validación adicional
    }),
    validateFields
], apprenticeController.postLoginApprentice);


// Actualizar aprendiz por ID (Solo valida ID y updatedAt)
apprenticeRoute.put('/updateapprenticebyid/:id', [
    // validateJWT,
    check('tpdocument', 'El tipo de documento es obligatorio').notEmpty(),
    check('tpdocument').custom(apprenticeHelper.validateTpDocument),
    check('numDocument', 'El número docuemnto es obligatorio').notEmpty(),
    check('numDocument', 'El número docuemnto debe tener mínimo 8 y maximo 10 caracteres').isLength({ min: 8, max: 10 }),
    check('numDocument').custom(async (numDocument, { req }) => {
        await apprenticeHelper.validateNumDocumentIfIsDiferent(numDocument, req.params.id);
    }),
    check('firstName', 'El nombre es obligatorio y debe ser una línea de texto').notEmpty().isString().isLength({min: 2, max: 50}),
    check('lastName', 'El apellido es obligatorio y debe ser una línea de texto').notEmpty().isString().isLength({min: 2, max: 50}),
    check('phone', 'El teléfono es obligatorio').notEmpty(),
    check('phone', 'El teléfono es obligatorio').isMobilePhone(),
    check('phone').custom(async (phone, { req }) => {
        await apprenticeHelper.validatePhoneIfIsDifferent(phone, req.params.id);
    }),
    check('institutionalEmail', 'El correo institucional es obligatorio').notEmpty(),
    check('institutionalEmail', 'El correo institucional debe ser válido').isEmail(),
    check('institutionalEmail').custom(async (institutionalEmail, { req }) => {
        await apprenticeHelper.validateInstitutionalEmailIfIsDifferent(institutionalEmail, req.params.id);
    }),
    check('personalEmail', 'El correo personal es obligatorio').notEmpty(),
    check('personalEmail', 'El correo personal debe ser válido').isEmail(),
    check('personalEmail').custom(async (personalEmail, { req }) => {
        await apprenticeHelper.validatePersonalEmailIfIsDifferent(personalEmail, req.params.id);
    }),
    check('fiche', 'La ficha debe ser obligatoria').notEmpty(),
    check('fiche', 'El Id de la ficha debe ser válido').isMongoId(),
    check('modality', 'La modalidad debe ser obligatoria').notEmpty(),
    check('modality', 'El Id de la modalidad debe ser válido').isMongoId(),
    check('modality').custom(apprenticeHelper.validateModality),
    check('modality').custom(apprenticeHelper.validateModalityStatus),
    check('status', "El estado debe ser 0 a 4").optional().isInt({ min: 0, max: 4 }),
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
