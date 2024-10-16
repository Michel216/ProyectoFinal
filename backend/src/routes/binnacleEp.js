const express = require('express')
const binnacleController = require("./../controllers/binnacleEp.js")
const binnacleHelper = require("./../helpers/binnacleEp.js")
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const { check } = require('express-validator');

const binnacleRoutes = express.Router()

// listar todas las bitácoras
binnacleRoutes.get("/listallbinnacles", [
    // validateJWT,
    validateFields
], binnacleController.getListAllBinnacles)

// Listar bitácoras por ID
binnacleRoutes.get("/listbinnaclesbyid/:id", [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    validateFields
], binnacleController.getListBinnacleById)

// listar bitácoras por asignación 
binnacleRoutes.get("/listbinnaclesbyassignment/:assignment", [
    validateJWT,
    check('assignment', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('assignment').custom(binnacleHelper.validateAssignment),
    validateFields
], binnacleController.getListBinnaclesByAssignment)

// listar bitácoras por instructor 
binnacleRoutes.get("/listbinnaclesbyinstructor/:instructor", [
    validateJWT,
    check('instructor', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    // check('instructor').custom(binnacleHelper.validateInstructor),
    validateFields
], binnacleController.getListBinnaclesByInstructor)

// crear bitácoras
binnacleRoutes.post("/addbinnacles", [
    validateJWT,
    check('assignment', 'La asignación es obligatoria y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('assignment').custom(binnacleHelper.validateAssignment),
    check('instructor', 'El instructor es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    // check('instructor').custom(binnacleHelper.validateInstructor),
    check('number', 'El número es obligatorio y debe ser un número').isNumeric(),
    check('number').custom(binnacleHelper.validateNumber),
    check('status').optional().custom(binnacleHelper.validateStatus),
    check('document', 'El documento es obligatorio').notEmpty(),
    check('observations', 'Las observaciones son obligatorias').notEmpty(),
    check('observations.*.observation', 'Cada observación es obligatoria y debe tener al menos 3 caracteres').notEmpty().isLength({ min: 3 }),
    check('observations.*.user', 'El usuario en cada observación es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    // check('observations.*.user').custom(binnacleHelper.validateUserEp),
    check('observations.*.observationDate', 'La fecha en cada observación es obligatoria y debe ser una fecha válida').notEmpty().isDate(),
    validateFields
], binnacleController.postAddBinnacle)

// modificar bitácoras
binnacleRoutes.put("/updatebinnaclebyid/:id", [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    check('assignment', 'La asignación debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('assignment').optional().custom(binnacleHelper.validateAssignment),
    check('instructor', 'El instructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('number', 'El número debe ser obligatorio y debe ser string').optional().isNumeric(),
    check('number').optional().custom(binnacleHelper.validateNumber),
    check('status').optional().custom(binnacleHelper.validateStatus),
    validateFields
], binnacleController.putUpdateBinnacle)

binnacleRoutes.put("/updatestatus/:id/:status", [
    // validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    check('status').custom(binnacleHelper.validateStatus),
    validateFields
], binnacleController.putUpdateStatus)

module.exports = binnacleRoutes