const Apprentice = require("../models/apprentice.js");

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
    // Actualizar aprendiz
    putUpdateApprentice: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const updateApprentice = await Apprentice.findByIdAndUpdate(id, newData, { new: true });
            res.status(200).json({ updateApprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Habilitar aprendiz
    putEnableApprentice: async (req, res) => {
        try {
            const id = req.params.id;
            const enableApprentice = await Apprentice.findByIdAndUpdate(id, { status: 1 });
            res.status(200).json({ message: 'Aprendiz activo' });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Deshabilitar aprendiz
    putDisableApprentice: async (req, res) => {
        try {
            const id = req.params.id;
            const disableApprentice = await Apprentice.findByIdAndUpdate(id, { status: 0 });
            res.status(200).json({ message: 'Aprendiz Inactivo' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
};

module.exports = apprenticeController;