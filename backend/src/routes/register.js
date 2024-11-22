const express = require('express')
const registerController = require('../controllers/register.js')
const { validateFields } = require('../middlewares/validate-fields.js');
const { validateJWT } = require('../middlewares/validateJWT.js');
const { check } = require('express-validator');
const { validateDateRange } = require('../helpers/register.js');
const {validateAtLeastOneInstructor} = require('../helpers/register.js')

const registerRoute = express.Router()

//obtener todos los registros
registerRoute.get('/listallregister', [
    // validateJWT,
    validateFields],
    registerController.listallregister);

//obtener registro por id
registerRoute.get('/listregisterbyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], registerController.getlistregisterbyid);

//obtener registro por id del aprendiz
registerRoute.get('/listregisterbyapprentice/:idapprentice', [
    // validateJWT,
    check('idapprentice', 'El ID del aprendiz debe ser un ID válido de MongoDB').notEmpty().isMongoId(),
    validateFields], registerController.getlistregisterbyapprentice);

//obtener registro por id de la ficha   
registerRoute.get('/listregistersbyfiche/:idfiche', [
    // validateJWT,
    check('idfiche', 'El ID del la ficha debe ser un ID válido de MongoDB').notEmpty().isMongoId(),
    validateFields],
    registerController.getlistregisterbyfiche);

//obtener registro por id de la modalidad 
registerRoute.get('/listregisterbymodality/:idmodality', [
    // validateJWT,
    check('idmodality', 'El ID de la modalidad debe ser un ID válido de MongoDB').notEmpty().isMongoId(),
    validateFields],
    registerController.getlistregisterbymodality);


//actualizar por modalidad
    registerRoute.put('/updateModalityregister/:id', [
        // validateJWT, 
        check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
        validateFields 
    ], registerController.updateregisterbyid);
  

//obtener registros por fecha de inicio    
 registerRoute.get('/listregisterbystartdate', [
    // validateJWT, // Habilitar validación si es necesario
    check('startDate', 'El campo startDate es obligatorio y debe ser una fecha válida').notEmpty().isDate(),
    check('endDate', 'El campo endDate es obligatorio y debe ser una fecha válida').optional().isDate(),
    validateFields
], registerController.getlistregisterbystartdate);

// Obtener registro por fecha de finalización
registerRoute.get('/listregisterbyenddate', [
    // Habilitar validación si es necesario
    check('startDate', 'El campo startDate es obligatorio y debe ser una fecha válida').optional().isDate(),
    check('endDate', 'El campo endDate es obligatorio y debe ser una fecha válida').notEmpty().isDate(),
    validateFields
], registerController.getlistregisterbyenddate);

//agregar un nuevo registro
registerRoute.post('/addregister', [
    // validateJWT,
    check('apprentice', 'El apprentice es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('modality', 'El modality es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('startDate', 'El campo startDate es obligatorio y debe ser una fecha válida').isDate(),
    check('company', 'El campo company es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('emailCompany', 'El correo de la compañía es obligatorio y debe ser un correo válido').notEmpty().isEmail(),
    check('businessProyectHour', 'El campo businessProyectHour es obligatorio ').not().isEmpty(),
    check('phonecompany', 'El campo phonecompany es obligatorio y debe ser un número de teléfono válido de 10 dígitos').isLength({ min: 10, max: 10 }).isNumeric(),
    check('addresscompany', 'El campo addresscompany es obligatorio, debe ser único y debe tener al menos 7 caracteres').isLength({ min: 7 }),
    check('owner', 'El campo owner es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('docAlternative', 'El campo docAlternative es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('judymentPhoto', 'El campo judymentPhoto es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    check('certificationDoc', 'El campo certificationDoc es obligatorio y debe ser una cadena de texto').not().isEmpty(),
    //check('hour', 'El campo hour es obligatorio y debe ser una hora válida en formato HH:mm').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // Cambio a validación de formato de hora
    check('hour', 'El campo hour es obligatorio y debe ser una hora válida en formato HH:mm').notEmpty(), // Cambio a validación de formato de hora
    validateFields
], registerController.postaddregister);


//actualizar registro por id
registerRoute.put('/updateregisterbyid/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], registerController.updateregisterbyid);

//habilitar registro por id
registerRoute.put('/enableregister/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], registerController.putenableregister);

//deshabilitar registro por id
registerRoute.put('/disableregister/:id', [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields], registerController.putdisableregister)

    registerRoute.put('/addassignment', [
        validateJWT,
check('apprentice', 'El aprendiz es obligatio Y tiene que ser un id').notEmpty().isMongoId(),
        check('followInstructor', 'El followInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
        check('technicalInstructor', 'El technicalInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
        check('proyectInstructor', 'El proyectInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
        validateAtLeastOneInstructor(),
        validateFields
    ], registerController.putAddAssignment);

module.exports = registerRoute;
