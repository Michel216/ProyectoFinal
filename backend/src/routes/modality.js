const express = require("express")
const modalityController = require("./../controllers/modality.js")
const modalityHelper = require("./../helpers/modality.js")
const { validateFields } = require('./../middlewares/validate-fields.js');
const { validateRepforaJWT } = require('./../middlewares/validateJWTRepfora.js');
const { check } = require('express-validator');

const modalityRoutes = express.Router()

// listar todas las modalidades
modalityRoutes.get("/listallmodality", [
    validateRepforaJWT,
    validateFields
], modalityController.getListAllModalities)

// listar modalidades por ID
modalityRoutes.get("/listmodalitybyid/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(modalityHelper.validateId),
    validateFields
], modalityController.getListModalityById)

// crear modalidades
modalityRoutes.post("/addmodality", [
    validateRepforaJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('hourInstructorFollow', 'Las horas del instructor de seguimiento son obligatorias').optional().isNumeric(),
    check('hourInstructorTechnical', 'Las horas del instructor técnico son obligatorias').optional().isNumeric(),
    check('hourInstructorProject', 'Las horas del instructor de proyecto son obligatorias').optional().isNumeric(),
    modalityHelper.validateAtLeastOneInstructorHour(), // valida al menos la hora de un instructor
    validateFields
], modalityController.postAddModality)

// modificar modalidades
modalityRoutes.put("/updatemodalitybyid/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(modalityHelper.validateId),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('hourInstructorFollow', 'Las horas del instructor de seguimiento son obligatorias').optional().isNumeric(),
    check('hourInstructorTechnical', 'Las horas del instructor técnico son obligatorias').optional().isNumeric(),
    check('hourInstructorProject', 'Las horas del instructor de proyecto son obligatorias').optional().isNumeric(),
    modalityHelper.validateAtLeastOneInstructorHour(),
    validateFields
], modalityController.putUpdateModality)

// activar modalidades
modalityRoutes.put("/enablemodalitybyid/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(modalityHelper.validateId),
    validateFields
], modalityController.putEnableModality)

// desactivar modalidades
modalityRoutes.put("/disablemodalitybyid/:id", [
    validateRepforaJWT,
    check('id', 'El id es obligatorio y debe ser un ID de MongoDB válido').notEmpty().isMongoId(),
    check('id').custom(modalityHelper.validateId),
    validateFields
], modalityController.putDisableModality)

module.exports = modalityRoutes