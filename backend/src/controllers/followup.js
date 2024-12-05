const Followup = require('../models/followup.js');

const followupController = {
    // Listar todos los seguimientos
    getListAllFollowup: async (req, res) => {
        try {
            const listallFollowup = await Followup.find().populate({
                path: 'assignment',
                populate: {
                    path: 'apprentice',
                    select: 'firstName lastName'
                }
            })
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
            const idRegister = req.params.idRegister;
            const listFollowupByAssignment = await Followup.findOne({ assignment: idRegister });
            res.status(200).json({ listFollowupByAssignment });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Listar seguimientos por instructor
    getListFollowupByInstructor: async (req, res) => {
        try {
            const idInstructor = req.params.idInstructor;
            const listFollowupByInstructor = await Followup.find({ instructor: idInstructor }).populate({
                path: 'assignment',
                populate: {
                    path: 'apprentice',
                    select: 'firstName lastName'
                }
            });
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
    // Crea una observación
    putAddObservation: async (req, res) => {
        try {
            const id = req.params.id;
            const observations = req.body.observations
            const updatedBinnacle = await Followup.findByIdAndUpdate(id, { $push: { observations } }, { new: true })
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
            const updatedFollowud = await Followup.findByIdAndUpdate(id, { status }, { new: true })
            res.status(200).json({ updatedFollowud })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
};

module.exports = followupController;
