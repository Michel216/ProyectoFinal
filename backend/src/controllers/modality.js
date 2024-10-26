const Modality = require("./../models/modality.js")

const modalityController = {
    // listar todas las modalidades
    getListAllModalities: async (req, res) => {
        try {
            const listAllModalities = await Modality.find()
            res.status(200).json({ listAllModalities })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // listar modalidades por ID
    getListModalityById: async (req, res) => {
        try {
            const id = req.params.id
            const listModalityById = await Modality.findById(id)
            res.status(200).json({ listModalityById })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // crear modalidades
    postAddModality: async (req, res) => {
        try {
            const { name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject} = req.body
            const newModality = new Modality({ name, hourInstructorFollow, hourInstructorTechnical, hourInstructorProject })
            await newModality.save()
            res.status(200).json({ newModality })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // modificar modalidades
    putUpdateModality: async (req, res) => {
        try {
            const id = req.params.id
            const newData = req.body
            const updatedModality = await Modality.findByIdAndUpdate(id, newData, {new: true})
            res.status(200).json({ updatedModality })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // activar modalidades
    putEnableModality: async (req, res) => {
        try {
            const id = req.params.id
            const enableModality = await Modality.findByIdAndUpdate(id, { status: 1 })
            res.status(200).json({ msg: "Modalidad activada" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // desactivar modalidades
    putDisableModality: async (req, res) => {
        try {
            const id = req.params.id
            const disableModality = await Modality.findByIdAndUpdate(id, { status: 0 })
            res.status(200).json({ msg: "Modalidad desactivada" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = modalityController 