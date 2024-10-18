const Apprentice = require("../models/apprentice.js");

const apprenticeController = {
    // Obtener todos los aprendices
    getListApprentices: async (req, res) => {
        try {
            const listApprentice = await Apprentice.find();
            res.json({ listApprentice });
        } catch (error) {
            console.error({ error });
            res.status(400).json({ error: "Error al listar Aprendices" });
        }
    },
    // Obtener todos los aprendices por ID
    getListApprenticesById: async (req, res) => {
        try {
            const id = req.params.id;
            const listApprenticesById = await Apprentice.findById(id);
            res.json({ listApprenticesById });
        } catch (error) {
            console.error({ error });
            res.status(400).json({ error: "Error al buscar Aprendices por ID" });
        }
    },
    // Obtener aprendiz por ficha
    getListApprenticesByFiche: async (req, res) => {
        try {
            const idFiche = req.params.idFiche;
            const listApprenticesByFiche = await Apprentice.find({ fiche: idFiche });
            res.json({ listApprenticesByFiche });
        } catch (error) {
            console.error({ error });
            res.status(400).json({ error: "Error al buscar los aprendices por el Id de la ficha" });
        }
    },
    // Obtener aprendiz por estado
    getListApprenticeByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            const idApprentice = req.params.idApprentice;
            const apprentices = await Apprentice.findByIdAndUpdate(idApprentice,{ status });
            res.json({apprentices});
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error interno del servidor" });
        }
    },
    // Añadir aprendiz
    postAddAprentice: async (req, res) => {
        const { tpdocument, numDocument, firstName, lastName, phone, email, fiche} = req.body;
        try {
            const newApprentice = new Apprentice({
                tpdocument,
                numDocument,
                firstName,
                lastName,
                phone,
                email,
                fiche
            });
            await newApprentice.save();
            res.json({ newApprentice });
        } catch (error) {
            console.error('Error al insertar un nuevo Aprendiz', error);
            res.status(400).json({ error });
        }
    },
    // Actualizar aprendiz
    putUpdateApprentice: async (req, res) => {
        const id = req.params.id;
        const newData = req.body;
        try {
            // Asegúrate de incluir `updatedAt` si es obligatorio
            const updateApprentice = await Apprentice.findByIdAndUpdate(id, newData, { new: true });
            res.status(200).json({updateApprentice});
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