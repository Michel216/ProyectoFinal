const Apprentice = require("../models/apprentice.js");

const apprenticeController = {
    //obtener todos los aprendices
    getListApprentices: async (req, res) => {
        try {
            const listApprentice = await Apprentice.find()
            res.json({ listApprentice })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar Aprendices" })
        }
    },
    //obtener todos los aprendices por id 
    getListApprenticesById: async (req, res) => {
        try {
            const id = req.params.id
            const listApprenticesById = await Apprentice.findById(id)
            res.json({ listApprenticesById })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al buscar Aprendices por ID" })
        }
    },
    //obtener aprndiz por ficha 
    getListApprenticesByFiche: async (req, res) => {
        try {
            const idFiche = req.params.idFiche;
            const listApprenticesByFiche = await Apprentice.find({fiche: idFiche})
            res.json({ listApprenticesByFiche })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al buscar los aprendices por el Id de la ficha" })
        }
    },
    //obtene aprendiz por estado
    getListApprenticeByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            const apprentices = await Apprentice.find({ status });
            return res.status(200).json(apprentices);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error interno del servidor" })
        }
    },
    // añadir aprendiz
    postAddAprentice: async (req, res) => {
        const { tpdocument, numdocument, firstName, lastName, phone, email } = req.body
        try {
            //Validación del número de teléfono
            await apprenticeHelper.validatePhone(phone);

            //validación de la cédula
            await apprenticeHelper.validateDocumento( numdocument);

            const Apprentice = new Apprentice({
                tpdocument,
                numdocument,
                firstName,
                lastName,
                phone,
                email
            })
            await Apprentice.save()
            res.json({Apprentice})
        }
        catch (error) {
            console.error('Error al insertar un nuevo Aprendiz', error)
            res.status(500).json({ error })
        }
    },
    // actualizar aprendiz
    putUpdateApprentice: async (req, res) => {
        const id = req.params.id
        const newData = req.body;
        try {
            const updateApprentice = await Apprentice.findByIdAndUpdate(id, newData, { new: true });
            res.status(200).json(updateApprentice);
        } catch (error) {
            res.status(500).json({ mesage: "Error actualizando el aprendiz", error });
        }
    },
    //habilitar aprendiz
    putEnableApprentice: async (req, res) => {
        const id = req.params.id;
        try {
            const enableApprentice = await Apprentice.findByIdAndUpdate( id, { estado: 1 }, { new: true });
            res.json({ message: 'Aprendiz activo', aprendiz: enableApprentice });
        } catch (error) {
            res.status(500).json({ message: 'Error al activar el aprendiz', error });
        }
    },
    //deshabilitar aprendiz
    putDisableApprentice: async (req, res) => {
        const id = req.params.id;
        try {
            const disableApprentice = await Apprentice.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ message: 'Aprendiz Inactivo', aprendiz: disableApprentice });
        } catch (error) {
            res.status(500).json({ message: 'Error al desactivar el aprendiz', error })
        }
    }
};

module.exports = apprenticeController
