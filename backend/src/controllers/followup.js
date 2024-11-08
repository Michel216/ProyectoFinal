const Followup = require('../models/followup.js');

const followupController = {
    // Listar todos los seguimientos
    getListAllFollowup: async (req, res) => {
        try {
            const listallFollowup = await Followup.find()
            // .populate({ path: 'assignment' })
            // .exec();
            res.status(200).json({ listallFollowup });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Listar seguimiento por ID
    getListFollowupById: async (req, res) => {
        try {
            const id = req.params.id;
            const listFollowupById = await Followup.findById(id);
            res.status(200).json({ listFollowupById });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Listar seguimientos por asignación
    getListFollowUpByAssignment: async (req, res) => {
        try {
            const idAssignment = req.params.idAssignment;
            const listFollowupByAssignment = await Followup.findOne({ assignment: idAssignment });
            res.status(200).json({ listFollowupByAssignment });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Listar seguimientos por instructor
    getListFollowupByInstructor: async (req, res) => {
        try {
            const idInstructor = req.params.idInstructor;
            const listFollowupByInstructor = await Followup.findOne({ instructor: idInstructor });
            res.status(200).json({ listFollowupByInstructor });
        } catch (error) {
            res.status(400).json({ error });
        }
    }, 
    // Añadir seguimiento
    postAddFollowup: async (req, res) => {
        try {
            const { assignment, instructor, number, month, document, users, observations } = req.body;
            const followUp = new Followup({
                assignment,
                instructor,
                number,
                month,
                document,
                users,
                observations
            });

            await followUp.save();
            res.status(200).json({ followUp });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Actualizar seguimiento
    putUpdateFollowupById: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const updateFollowup = await Followup.findByIdAndUpdate(id, newData, { new: true });
            res.status(200).json({ updateFollowup });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    },
    // modifica el estado de la bitácora
    putUpdateStatus: async (req, res) => {
        try {
            const id = req.params.id
            const status = req.params.status
            const updatedFollowud = await Followup.findByIdAndUpdate(id, { status }, { new: true })
            res.status(200).json({ updatedFollowud })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
};

module.exports = followupController;
