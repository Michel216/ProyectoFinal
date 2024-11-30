const express = require('express')
const registerController = require('../controllers/register.js')
const { validateFields } = require('../middlewares/validate-fields.js');
const { validateRepforaJWT } = require('./../middlewares/validateJWTRepfora.js');
const { check } = require('express-validator');
const {registerHelper, validateDateRange, validateAtLeastOneInstructor} = require('../helpers/register.js');

const registerRoute = express.Router()

//obtener todos los registros
registerRoute.get('/listallregister', [
    validateRepforaJWT,
    validateFields
], registerController.listallregister);

//obtener registro por id
registerRoute.get('/listregisterbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(registerHelper.validateId),
    validateFields
], registerController.getlistregisterbyid);

//obtener registro por id del aprendiz
registerRoute.get('/listregisterbyapprentice/:idApprentice', [
    validateRepforaJWT,
    check('idApprentice', 'El ID del aprendiz debe ser un ID válido de MongoDB').notEmpty().isMongoId(),
    check('idApprentice').custom(registerHelper.validateApprentice),
    validateFields
], registerController.getListRegisterByApprentice);

//obtener registro por id de la modalidad 
registerRoute.get('/listregisterbymodality/:idModality', [
    validateRepforaJWT,
    check('idModality', 'El ID de la modalidad debe ser un ID válido de MongoDB').notEmpty().isMongoId(),
    check('idModality').custom(registerHelper.validateModality),
    validateFields
], registerController.getlistregisterbymodality);

//obtener registros por fecha de inicio    
 registerRoute.get('/listregisterbystartdate', [
    validateRepforaJWT, // Habilitar validación si es necesario
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
    validateRepforaJWT,
    check('apprentice', 'El apprentice es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('apprentice').custom(registerHelper.validateApprentice),
    check('modality', 'El modality es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('modality').custom(registerHelper.validateModality),
    check('startDate', 'El campo startDate es obligatorio y debe ser una fecha válida').isDate(),
    check('company', 'El campo company es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('emailCompany', 'El correo de la compañía es obligatorio y debe ser un correo válido').notEmpty().isEmail(),
    check('businessProyectHour', 'El campo businessProyectHour es obligatorio ').notEmpty(),
    check('phonecompany', 'El campo phonecompany es obligatorio y debe ser un número de teléfono válido de 10 dígitos').isLength({ min: 10, max: 10 }).isNumeric(),
    check('addresscompany', 'El campo addresscompany es obligatorio, debe ser único y debe tener al menos 7 caracteres').isLength({ min: 7 }),
    check('owner', 'El campo owner es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('docAlternative', 'El campo docAlternative es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('judymentPhoto', 'El campo judymentPhoto es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('certificationDoc', 'El campo certificationDoc es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('hour', 'El campo hour es obligatorio y debe ser una hora válida en formato HH:mm').notEmpty(),
    validateFields
], registerController.postaddregister);


//actualizar registro por id
registerRoute.put('/updateregisterbyid/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(registerHelper.validateId),
    check('apprentice', 'El apprentice es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('apprentice').custom(registerHelper.validateApprentice),
    check('modality', 'El modality es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
    check('idModality').custom(registerHelper.validateModality),
    check('startDate', 'El campo startDate es obligatorio y debe ser una fecha válida').isDate(),
    check('company', 'El campo company es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('emailCompany', 'El correo de la compañía es obligatorio y debe ser un correo válido').notEmpty().isEmail(),
    check('businessProyectHour', 'El campo businessProyectHour es obligatorio ').notEmpty(),
    check('phonecompany', 'El campo phonecompany es obligatorio y debe ser un número de teléfono válido de 10 dígitos').isLength({ min: 10, max: 10 }).isNumeric(),
    check('addresscompany', 'El campo addresscompany es obligatorio, debe ser único y debe tener al menos 7 caracteres').isLength({ min: 7 }),
    check('owner', 'El campo owner es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('docAlternative', 'El campo docAlternative es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('judymentPhoto', 'El campo judymentPhoto es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('certificationDoc', 'El campo certificationDoc es obligatorio y debe ser una cadena de texto').notEmpty(),
    check('hour', 'El campo hour es obligatorio y debe ser una hora válida en formato HH:mm').notEmpty(),
    validateFields
], registerController.updateregisterbyid);

//actualizar por modalidad
registerRoute.put('/updatemodalityRegister/:id', [
    validateRepforaJWT, 
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(registerHelper.validateId),
    check('idModality', 'El ID de la modalidad debe ser un ID válido de MongoDB').notEmpty().isMongoId(),
    check('idModality').custom(registerHelper.validateModality),
    validateFields 
], registerController.updateregisterbyid);

//habilitar registro por id
registerRoute.put('/enableregister/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(registerHelper.validateId),
    validateFields
], registerController.putenableregister);

//deshabilitar registro por id
registerRoute.put('/disableregister/:id', [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(registerHelper.validateId),
    validateFields
], registerController.putdisableregister)

registerRoute.put('/addassignment', [
        validateRepforaJWT,
        check('apprentice', 'El apprentice es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
        check('apprentice').custom(registerHelper.validateApprentice),
        check('followInstructor', 'El followInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
        check('technicalInstructor', 'El technicalInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
        check('proyectInstructor', 'El proyectInstructor debe ser un ID de MongoDB válido').optional().isMongoId(),
        validateAtLeastOneInstructor(),
        validateFields
    ], registerController.addAssignment);

module.exports = registerRoute;
