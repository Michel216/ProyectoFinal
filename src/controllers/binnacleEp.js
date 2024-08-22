const Binnacle = require("./../models/binnacleEp.js")

const binnacleController = {
    // listar todas las bitácoras
    getListAllBinnacles: async (req, res) => {
        try {
            const ListAllBinnacles = await Binnacle.find()
            res.json({ ListAllBinnacles })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácoras" })
        }
    },
    // listar bitácoras por ID
    getListBinnacleById: async (req, res) => {
        try {
            const id = req.params.id
            const listBinnaclesById = await Binnacle.findById(id)
            res.json({ listBinnaclesById })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora" })
        }
    },
    // listar bitácoras por asignación 
    getListBinnaclesByAssignment: async (req, res) => {
        try {
            const idAssignment = req.params.idAssignment
            const listBinnaclesByAssignment = await Binnacle.find({ assignament: idAssignment })
            res.json({ listBinnaclesByAssignment })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora" })
        }
    },
    // listar bitácoras por instructor
    getListBinnaclesByInstructor: async (req, res) => {
        try {
            const idInstructor = req.params.idInstructor
            const listBinnaclesByInstructor = await Binnacle.find({ instructor: idInstructor })
            res.json({ listBinnaclesByInstructor })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora" })
        }
    },
    // crear bitácoras
    postAddBinnacle: async (req, res) => {
        try {
            const { assignment, instructor, number, document, observations, users } = req.body
            const newBinnacle = new Binnacle({ assignment, instructor, number, document, observations, users })
            await newBinnacle.save()
            res.json({ newBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al crear bitácora" })
        }
    },
    // modificar bitácoras
    putUpdateBinnacle: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, newData, {new: true})
            res.json({ updatedBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar bitácora" })
        }
    },
    // activar bitácoras 
    putEnableBinnacle: async (req, res) => {
        try {
            const id = req.params.id
            const enableBinnacle = await Binnacle.findByIdAndUpdate(id, { status: 1 })
            res.json({ msg: "Bitácora activada", enableBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al activar bitácora" })
        }
    },
    // desactivar bitácoras
    putDisableBinnacle: async (req, res) => {
        try {
            const id = req.params.id;
            const disableBinnacle = await Binnacle.findByIdAndUpdate(id, { status: 0 })
            res.json({ msg: "Bitácora desactivada", disableBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al desactivar bitácora" })
        }
    }
}
module.exports = binnacleController 