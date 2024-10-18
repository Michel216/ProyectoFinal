const Modality = require("./../models/modality.js")

const modalityController = {
    // listar todas las modalidades
    getListAllModalities: async (req, res) => {
        try {
            const listAllModalities = await Modality.find()
            res.json({ listAllModalities })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar modalidades" })
        }
    },
    // listar modalidades por ID
    getListModalityById: async (req, res) => {
        try {
            const id = req.params.id
            const listModalityById = await Modality.findById(id)
            res.json({ listModalityById })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar modalidad" })
        }
    },
    // crear modalidades
    postAddModality: async (req, res) => {
        try {
            const { name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject} = req.body
            const newModality = new Modality({ name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject})
            await newModality.save()
            res.json({ newModality })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al crear modalidad" })
        }
    },
    // modificar modalidades
    putUpdateModality: async (req, res) => {
        try {
            const id = req.params.id
            const newData = req.body
            const updatedModality = await Modality.findByIdAndUpdate(id, newData, {new: true})
            res.json({ updatedModality })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar modalidad" })
        }
    },
    // activar modalidades
    putEnableModality: async (req, res) => {
        try {
            const id = req.params.id
            const enableModality = await Modality.findByIdAndUpdate(id, { status: 1 })
            res.json({ msg: "Modalidad activada", enableModality })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al activar modalidad" })
        }
    },
    // desactivar modalidades
    putDisableModality: async (req, res) => {
        try {
            const id = req.params.id
            const disableModality = await Modality.findByIdAndUpdate(id, { status: 0 })
            res.json({ msg: "Modalidad desactivada", disableModality })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al desactivar modalidad" })
        }
    }
}
module.exports = modalityController 