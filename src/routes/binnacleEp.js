const express = require('express')
const binnacleController = require("./../controllers/binnacleEp.js")
const binnacleHelper = require("./../helpers/binnacleEp.js")
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateJWT } = require('./../middlewares/validateJWT.js');
const { check } = require('express-validator');

const binnacleRoutes = express.Router()
 
// listar todas las bitácoras
binnacleRoutes.get("/listallbinnacles", [
    validateJWT,
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
binnacleRoutes.get("/listbinnaclesbyassignment/:idAssignment", [
    validateJWT,
    check('idAssignment', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields
], binnacleController.getListBinnaclesByAssignment)

// listar bitácoras por instructor 
binnacleRoutes.get("/listbinnaclesbyinstructor/:idInstructor", [
    validateJWT,
    check('idInstructor', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    validateFields
], binnacleController.getListBinnaclesByInstructor)

// crear bitácoras
binnacleRoutes.post("/addbinnacles", [
    validateJWT,
    check('idAssignment', 'La asignación es obligatoria y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('idInstructor', 'El instructor es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('number', 'El número debe ser obligatorio y debe ser string').notEmpty(),
    check('number').custom(binnacleHelper.validateNumber),
    check('document', 'El documento es obligatorio').notEmpty(),
    check('observations', 'Las observaciones son obligatorias').notEmpty(),
    check('users', 'Los usuarios son obligatorios').notEmpty(),
    validateFields
], binnacleController.postAddBinnacle)

// modificar bitácoras
binnacleRoutes.put("/updatebinnaclebyid/:id", [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    check('idAssignment', 'La asignación debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('idInstructor', 'El instructor debe ser un ID de MongoDB válido').optional().isMongoId(),
    check('number').custom(binnacleHelper.validateNumber),
    validateFields
], binnacleController.putUpdateBinnacle)

// activar bitácoras
binnacleRoutes.put("/enablebinnaclebyid/:id", [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    validateFields
], binnacleController.putEnableBinnacle)

// desactivar bitácoras
binnacleRoutes.put("/disablebinnaclebyid/:id", [
    validateJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(binnacleHelper.validateId),
    validateFields
], binnacleController.putDisableBinnacle)

module.exports = binnacleRoutes