const express = require('express');
const apprendiceController = require('../controllers/apprentice.js')
const apprenticeHelper = require("./../helpers/apprentice.js")
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const { check } = require('express-validator');
// const { validateAtLeastOneInstructor } = require('../helpers/apprentice.js');

const apprendiceRoute = express.Router();

//Obtener todos los aprendices
 apprendiceRoute.get('/listallapprentice',[
    validateJWT,
    validateFields
 ], apprendiceController.getListApprentices);
//Obtener  aprendices por ID
 apprendiceRoute.get('/listapprenticebyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    validateFields
], apprendiceController.getListApprenticesById);
//Obtener aprendices por ficha
apprendiceRoute.get('/listapprenticebyfiche/:idFiche',[
    validateJWT,
    check('idFiche', 'El id de la ficha es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields
], apprendiceController.getListApprenticesByFiche);

//Obetener aprendices por estados
apprendiceRoute.get('/listapprenticebystatus/:status',[
    validateJWT,
    check('status', 'El estado es obligatorio').notEmpty(),
    check('status').custom(apprenticeHelper.validateStatus),
    validateFields
], apprendiceController.getListApprenticeByStatus);
//Añadir aprendiz
apprendiceRoute.post('/addapprentice',[
    // validateJWT,
    check('tpdocument','El tipo de documento es obligatorio').notEmpty(),
    validateFields
], apprendiceController.postAddAprentice)
//Actualizar aprendiz por ID
apprendiceRoute.put('/updateapprenticebyid/:id',[
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido y debe tener ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    check('numdocument','El número del documento es obligatorio').isInt(),
    check('firstname','Primer nombre es obligatorio').isString(),
    check('lastname','Apellido es obligatorio').isString(),
    check('phone','El número del celular es opcional').optional().isInt(),
    check('email','Email es opcional').optional().notEmpty(),
    check('fiche','Ficha es obligatorio').isInt(),
    check('status','Estado es obligatorio').isEmpty(),
    validateFields
], apprendiceController.putUpdateApprentice);
//Habilitar aprendiz por ID
apprendiceRoute.put('/enableapprentice/:id',[
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    validateFields
], apprendiceController.putEnableApprentice);
//Deshabilitar aprendiz por ID
apprendiceRoute.put('/disableapprentice/:id',[
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    check('id').custom(apprenticeHelper.validateApprentice),
    validateFields
], apprendiceController.putDisableApprentice );

module.exports = apprendiceRoute;
