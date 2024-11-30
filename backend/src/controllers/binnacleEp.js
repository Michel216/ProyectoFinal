const Binnacle = require("./../models/binnacleEp.js")

const binnacleController = {
    // listar todas las bitácoras
    getListAllBinnacles: async (req, res) => {
        try {
            const ListAllBinnacles = await Binnacle.find().populate({
                path: 'assignment',
                populate: {
                    path: 'apprentice',
                    select: 'firstName lastName'
                }
            })
            res.status(200).json({ ListAllBinnacles })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // listar bitácoras por ID
    getListBinnacleById: async (req, res) => {
        try {
            const id = req.params.id;
            const listBinnacleById = await Binnacle.findById(id);
            res.status(200).json({ listBinnacleById });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // listar bitácoras por asignación 
    getListBinnaclesByAssignment: async (req, res) => {
        try {
            const idRegister = req.params.idRegister
            const listBinnaclesByAssignment = await Binnacle.find({ assignment: idRegister })
            res.status(200).json({ listBinnaclesByAssignment })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // listar bitácoras por instructor
    getListBinnaclesByInstructor: async (req, res) => {
        try {
            const idInstructor = req.params.idInstructor;
            const listBinnalcesByInstructor = await Binnacle.find({ instructor: idInstructor });
            res.status(200).json({ listBinnalcesByInstructor });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // crear bitácoras
    postAddBinnacle: async (req, res) => {
        try {
            const { assignment, instructor, number, document, observations, status } = req.body;

            const newBinnacle = new Binnacle({ assignment, instructor, number, document, observations, status });
            await newBinnacle.save();
            res.status(200).json({ newBinnacle });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // modificar bitácoras
    putUpdateBinnacle: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, newData, { new: true })
            res.status(200).json({ updatedBinnacle })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putAddObservation: async (req, res) => {
        try {
            const id = req.params.id;
            const observations = req.body.observations
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, { $push: { observations } }, { new: true })
            res.status(200).json({ updatedBinnacle })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // modifica el estado de la bitácora
    putUpdateStatus: async (req, res) => {
        try {
            const id = req.params.id
            const status = req.params.status
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, { status }, { new: true })
            res.status(200).json({ updatedBinnacle })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = binnacleController