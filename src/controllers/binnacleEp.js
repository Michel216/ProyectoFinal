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
            const assignment = req.params.assignment
            const listBinnaclesByAssignment = await Binnacle.find({ assignment })
            res.json({ listBinnaclesByAssignment })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora" })
        }
    },
    // listar bitácoras por instructor
    getListBinnaclesByInstructor: async (req, res) => {
        try {
            const instructor = req.params.instructor
            const listBinnaclesByInstructor = await Binnacle.find({ instructor })
            res.json({ listBinnaclesByInstructor })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora" })
        }
    },
    // crear bitácoras
    postAddBinnacle: async (req, res) => {
        try {
            const { assignment, instructor, number, document, observations } = req.body;
            const newBinnacle = new Binnacle({ assignment, instructor, number, document, observations });
            await newBinnacle.save();
            res.json({ newBinnacle });
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al crear bitácora" });
        }
    },
    // modificar bitácoras
    putUpdateBinnacle: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, newData, { new: true })
            res.json({ updatedBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar bitácora" })
        }
    },
    // modifica el estado de la bitácora
    putUpdateStatus: async (req, res) => {
        try {
            const id = req.params.id
            const status = req.params.status
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, { status }, { new: true })
            res.json({ updatedBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar bitácora" })
        }
    }
}
module.exports = binnacleController