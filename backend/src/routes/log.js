const express = require('express')
const logController = require('../controllers/log.js')
const logHelper = require("./../helpers/log.js")
const { validateFields } = require('../middlewares/validate-fields.js');
const { validateRepforaJWT } = require('./../middlewares/validateJWTRepfora.js');
const { check } = require('express-validator')

const logRoute = express.Router()

//obtener registros
logRoute.get('/listlogs', [
    validateRepforaJWT,
    validateFields], logController.getlistlogs);

//obtener registros por id
logRoute.get('/listlogs/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(logHelper.validateId),
    validateFields
], logController.getlistlogsbyid);

//añadir registros
logRoute.post('/addlog', [
    validateRepforaJWT,
    check('name', 'El campo name es obligatorio y debe ser una cadena de texto con al menos 10 caracteres y solo letras').notEmpty().isString().trim(),
    check('data', 'El campo data es obligatorio y debe ser una cadena de texto con al menos 5 caracteres').notEmpty().isString().trim(),
    check('action', 'El campo action es obligatorio, debe ser una cadena de texto con un máximo de 5 caracteres y solo letras').notEmpty().isString().trim(),
    check('information', 'El campo information es obligatorio y debe ser una cadena de texto con al menos 5 caracteres').notEmpty().trim(), 
    validateFields
], logController.postaddlog);

//habilitar registros por id
logRoute.put('/enablelogsbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(logHelper.validateId),
    validateFields
], logController.putenablelogsbyid);

//deshabilitar registros por id
logRoute.put('/disablelogsbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(logHelper.validateId),
    validateFields
], logController.putdisablelogsbyid);

module.exports = logRoute;