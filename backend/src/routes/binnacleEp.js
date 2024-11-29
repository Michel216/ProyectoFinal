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
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(binnacleHelper.validateId),
    validateFields
], binnacleController.getListBinnacleById)

// listar bitácoras por asignación 
binnacleRoutes.get("/listbinnaclesbyassignment/:idRegister", [
    validateRepforaJWT,
    check('idRegister', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('idRegister').custom(binnacleHelper.validateRegister),
    check('idRegister').custom(binnacleHelper.validateAssignment),
    validateFields
], binnacleController.getListBinnaclesByAssignment)

// listar bitácoras por instructor 
binnacleRoutes.get("/listbinnaclesbyinstructor/:idInstructor", [
    validateRepforaJWT,
    check('idInstructor', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    validateFields
], binnacleController.getListBinnaclesByInstructor)

// crear bitácoras
binnacleRoutes.post("/addbinnacles", [
    validateRepforaJWT,
    check('assignment', 'La asignación es obligatoria y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('assignment').custom(binnacleHelper.validateRegister),
    check('assignment').custom(binnacleHelper.validateAssignment),
    check('instructor', 'El instructor es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('number', 'El número es obligatorio y debe ser un número').isNumeric().trim(),
    check('number').custom(binnacleHelper.validateNumber),
    check('status').optional().trim().custom(binnacleHelper.validateStatus),
    check('document', 'El documento es obligatorio').notEmpty().trim(),
    validateFields
], binnacleController.postAddBinnacle)

binnacleRoutes.put("/addobservation/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(binnacleHelper.validateId),
    check('observations', 'Las observaciones son obligatorias').notEmpty().trim(),
    check('observations.*.observation', 'Cada observación es obligatoria').notEmpty().trim(),
    check('observations.*.user', 'El usuario en cada observación es obligatorio').notEmpty().trim(),
    check('observations.*.observationDate', 'La fecha en cada observación es obligatoria y debe ser una fecha válida').notEmpty().trim(),
    validateFields
], binnacleController.putAddObservation)

binnacleRoutes.put("/updatestatus/:id/:status", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId().trim(),
    check('id').custom(binnacleHelper.validateId),
    check('status').custom(binnacleHelper.validateStatus).trim(),
    validateFields
], binnacleController.putUpdateStatus)

module.exports = binnacleRoutes