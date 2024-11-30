const express = require('express')
const binnacleController = require("./../controllers/binnacleEp.js")
const binnacleHelper = require("./../helpers/binnacleEp.js")
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateRepforaJWT } = require('./../middlewares/validateJWTRepfora.js');
const { check } = require('express-validator');

const binnacleRoutes = express.Router()

// listar todas las bitácoras
binnacleRoutes.get("/listallbinnacles", [
    validateRepforaJWT,
    validateFields
], binnacleController.getListAllBinnacles)

// Listar bitácoras por ID
binnacleRoutes.get("/listbinnaclesbyid/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    validateFields
], binnacleController.getListBinnacleById)

// listar bitácoras por asignación 
binnacleRoutes.get("/listbinnaclesbyassignment/:idRegister", [
    validateRepforaJWT,
    check('idRegister', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('idRegister').custom(binnacleHelper.validateRegister),
    check('idRegister').custom(binnacleHelper.validateAssignment),
    validateFields
], binnacleController.getListBinnaclesByAssignment)

// listar bitácoras por instructor 
binnacleRoutes.get("/listbinnaclesbyinstructor/:idInstructor", [
    validateRepforaJWT,
    check('idInstructor', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields
], binnacleController.getListBinnaclesByInstructor)

// crear bitácoras
binnacleRoutes.post("/addbinnacles", [
    validateRepforaJWT,
    check('assignment', 'La asignación es obligatoria y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('assignment').custom(binnacleHelper.validateRegister),
    check('assignment').custom(binnacleHelper.validateAssignment),
    check('instructor', 'El instructor es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('number', 'El número es obligatorio y debe ser un número').isNumeric(),
    check('number').custom(binnacleHelper.validateNumber),
    check('status').optional().custom(binnacleHelper.validateStatus),
    check('document', 'El documento es obligatorio').notEmpty(),
    validateFields
], binnacleController.postAddBinnacle)

binnacleRoutes.put("/addobservation/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    check('observations', 'Las observaciones son obligatorias').notEmpty(),
    check('observations.*.observation', 'Cada observación es obligatoria').notEmpty(),
    check('observations.*.user', 'El usuario en cada observación es obligatorio').notEmpty(),
    check('observations.*.observationDate', 'La fecha en cada observación es obligatoria y debe ser una fecha válida').notEmpty(),
    validateFields
], binnacleController.putAddObservation)

binnacleRoutes.put("/updatestatus/:id/:status", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    check('status').custom(binnacleHelper.validateStatus),
    validateFields
], binnacleController.putUpdateStatus)

module.exports = binnacleRoutes