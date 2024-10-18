const express = require('express')
const logController = require('../controllers/log.js')
const { validateFields } = require('../middlewares/validate-fields.js');
const { validateJWT } = require('../middlewares/validateJWT.js');
const { check } = require('express-validator')

const logRoute = express.Router()

//obtener registros
logRoute.get('/listlogs', [
    validateJWT,
    validateFields], logController.getlistlogs);

//obtener registros por id
logRoute.get('/listlogs/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], logController.getlistlogsbyid);

//añadir registros
logRoute.post('/addlog', [
    // validateJWT,
    check('users', 'El campo users es obligatorio y debe ser una cadena de texto con al menos 10 caracteres y solo letras').not().isEmpty().isString(),
    check('email', 'El campo email es obligatorio y debe ser una cadena de texto con un formato de email válido').not().isEmpty().isString().isEmail(),
    check('action', 'El campo action es obligatorio, debe ser una cadena de texto con un máximo de 5 caracteres y solo letras').not().isEmpty().isString(),
    check('information', 'El campo information es obligatorio y debe ser una cadena de texto con al menos 20 caracteres').not().isEmpty().isString(), 
    validateFields], logController.postaddlog);

//habilitar registros por id
logRoute.put('/enablelogsbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], logController.putenablelogsbyid);

//deshabilitar registros por id
logRoute.put('/disablelogsbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], logController.putdisablelogsbyid);

module.exports = logRoute;