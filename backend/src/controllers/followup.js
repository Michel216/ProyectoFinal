const Followup = require('../models/followup.js');

const followupController = {
    // Listar todos los seguimientos
    getListAllFollowup: async (req, res) => {
        try {
            const listallFollowup = await Followup.find()
            .populate({ path: 'assignment' })
            .exec();
            res.json({ listallFollowup });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Error al listar los seguimientos' });
        }
    },
    // Listar seguimiento por ID
    getListFollowupById: async (req, res) => {
        try {
            const id = req.params.id;
            const listFollowupById = await Followup.findById(id);
            res.json({ listFollowupById });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Error al listar los seguimientos por ID' });
        }
    },
    // Listar seguimientos por asignación
    getListFollowUpInstructorByAssignment: async (req, res) => {
        try {
            const idAssignment = req.params.idAssignment;
            const listFollowupByAssignment = await Followup.findOne({ assignment: idAssignment });
            res.json({ listFollowupByAssignment });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Error al listar los seguimientos por asignación' });
        }
    },
    // Listar seguimientos por instructor
    getListFollowupByInstructor: async (req, res) => {
        try {
            const idInstructor = req.params.idInstructor;
            const listFollowupByInstructor = await Followup.findOne({ instructor: idInstructor });
            res.json({ listFollowupByInstructor });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Error al listar los seguimientos por instructor' });
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
            res.json({ followUp });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Error al insertar un nuevo seguimiento' });
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
            res.status(400).json({ message: "Error actualizando el seguimiento", error });
        }
    },
    // modifica el estado de la bitácora
    putUpdateStatus: async (req, res) => {
        try {
            const id = req.params.id
            const status = req.params.status
            const updatedFollowud = await Followup.findByIdAndUpdate(id, { status }, { new: true })
            res.json({ updatedFollowud })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar seguimientos" })
        }
    }
};

module.exports = followupController;
