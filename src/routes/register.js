const express = require('express')
const register = require('../controllers/register.js')
const { validateFields } = require('../middlewares/validate-fields.js');
const { validateJWT } = require('../middlewares/validateJWT.js');
const { check } = require('express-validator');
const { validateDateRange } = require('../helpers/register.js');

const registerRoute = express.Router()

//obtener todos los registros
registerRoute.get('/listallregister', [
    validateJWT,
    validateFields],
    register.listallregister);

//obtener registro por id
registerRoute.get('/listregisterbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields], register.getlistregisterbyid);

//obtener registro por id del aprendiz
registerRoute.get('/listregisterbyapprentice/:idapprentice', [
    validateJWT,
    check('idapprentice', 'El ID del aprendiz debe ser un ID válido de MongoDB').isMongoId(),
    validateFields], register.getlistregisterbyapprentice);

//obtener registro por id de la ficha   
registerRoute.get('/listregistersbyfiche/:idfiche', [
    validateJWT,
    check('idfiche', 'El ID del la ficha debe ser un ID válido de MongoDB').isMongoId(),
    validateFields],
    register.getlistregisterbyfiche);

//obtener registro por id de la modalidad 
registerRoute.get('/listregisterbymodality/:idmodality', [
    validateJWT,
    check('idmodality', 'El ID de la modalidad debe ser un ID válido de MongoDB').isMongoId(),
    validateFields],
    register.getlistregisterbymodality);

//obtener registros por fecha de inicio    
registerRoute.get('/listregisterbystartdate', [
    validateJWT,
    check('startdate', 'El campo startdate es obligatorio y debe ser una fecha válida').isDate(),
    validateFields],
    register.getlistregisterbystartdate);

//obtener registro por fecha de finalizacion
registerRoute.get('/listregisterbyenddate', [
    validateJWT,
    check('enddate', 'El campo enddate es obligatorio y debe ser una fecha válida').isDate(),
    validateFields],
    register.getlistregisterbyenddate);

//agregar un nuevo registro
registerRoute.post('/addregister', [
    validateJWT,
    check('apprentice', 'El apprentice es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('modality', 'El modality es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('fstart', 'El campo fstart es obligatorio y debe ser una fecha válida').isDate(),
    check('fend', 'El campo fend es obligatorio y debe ser una fecha válida').isDate(),
    check('company', 'El campo company es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('phonecompany', 'El campo phonecompany es obligatorio y debe ser un número de teléfono válido de 10 dígitos').isLength({ min: 10, max: 10 }).isNumeric(),
    check('addresscompany', 'El campo addresscompany es obligatorio, debe ser único y debe tener al menos 7 caracteres').isLength({ min: 7 }),
    check('owner', 'El campo owner es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('docalternative', 'El campo docalternative es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('hour', 'El campo hour es obligatorio y debe ser una fecha válida').isDate(),
    validateFields
], register.postaddregister);

//actualizar registro por id
registerRoute.put('/updateregisterbyid/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields], register.updateregisterbyid);

//habilitar registro por id
registerRoute.put('/enableregister/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields], register.putenableregister);

//deshabilitar registro por id
registerRoute.put('/disableregister/:id', [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').isMongoId(),
    validateFields], register.putdisableregister)


module.exports = registerRoute;
