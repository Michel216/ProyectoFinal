const Apprentice = require("../models/apprentice.js");
const apprenticeHelper = require('./../helpers/apprentice.js');
const { generateJWT } = require('../middlewares/validateJWT');
const apprenticeController = {
    // Obtener todos los aprendices
    getListApprentices: async (req, res) => {
        try {
            const listApprentice = await Apprentice.find();
            res.status(200).json({ listApprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Obtener todos los aprendices por ID
    getListApprenticesById: async (req, res) => {
        try {
            const id = req.params.id;
            const listApprenticesById = await Apprentice.findById(id);
            res.status(200).json({ listApprenticesById });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Obtener aprendiz por ficha
    getListApprenticesByFiche: async (req, res) => {
        try {
            const idFiche = req.params.idFiche;
            const listApprenticesByFiche = await Apprentice.find({ fiche: idFiche });
            res.status(200).json({ listApprenticesByFiche });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Obtener aprendiz por estado
    getListApprenticeByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            const idApprentice = req.params.idApprentice;
            const apprentices = await Apprentice.findByIdAndUpdate(idApprentice, { status });
            res.status(200).json({ apprentices });
            res.json({ apprentices });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Añadir aprendiz
    postAddAprentice: async (req, res) => {
        const { tpdocument, numDocument, firstName, lastName, phone, institutionalEmail, personalEmail, fiche, modality } = req.body;
        try {
            const newApprentice = new Apprentice({
                tpdocument,
                numDocument,
                firstName,
                lastName,
                phone,
                institutionalEmail,
                personalEmail,
                fiche,
                modality
            });
            await newApprentice.save();
            res.status(200).json({ newApprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Iniciar sesión del aprendiz
    postLoginApprentice: async (req, res) => {
        const { numDocument, email } = req.body;
        try {
            const apprentice = await Apprentice.findOne({ numDocument, email });
            if (!apprentice) {
                return res.status(400).json({ error: "El aprendiz no existe" });
            }
            await apprenticeHelper.validateLogin(email, numDocument);
            const token = await generateJWT(apprentice._id);
            res.json({ token });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
    // Actualizar aprendiz
    putUpdateApprentice: async (req, res) => {
        const id = req.params.id;
        const newData = req.body;
        try {
            // Asegúrate de incluir `updatedAt` si es obligatorio
            const updateApprentice = await Apprentice.findByIdAndUpdate(id, newData, { new: true });
            res.status(200).json({ updateApprentice });
        } catch (error) {
            console.error({ message: "Error actualizando el aprendiz", error });
            res.status(400).json({ message: "Error actualizando el aprendiz", error });
        }
    },
    // Habilitar aprendiz
    putEnableApprentice: async (req, res) => {
        const id = req.params.id;
        try {
            const enableApprentice = await Apprentice.findByIdAndUpdate(id, { status: 1 });
            res.json({ message: 'Aprendiz activo', enableApprentice });
        } catch (error) {
            console.error({ message: 'Error al activar el aprendiz', error });
            res.status(400).json({ message: 'Error al activar el aprendiz', error });
        }
    },
    // Deshabilitar aprendiz
    putDisableApprentice: async (req, res) => {
        const id = req.params.id;
        try {
            const disableApprentice = await Apprentice.findByIdAndUpdate(id, { status: 0 });
            res.json({ message: 'Aprendiz Inactivo', disableApprentice });
        } catch (error) {
            console.error({ message: 'Error al desactivar el aprendiz', error });
            res.status(400).json({ message: 'Error al desactivar el aprendiz', error });
        }
    }
};

module.exports = apprenticeController;