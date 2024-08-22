const { validateCreateFollowup, validateUpdateFollowup } = require('../helpers/followup.js');
const Followup = require('../models/followup.js')

const followupController = {
    // listar seguimientos
    getListAllFollowup: async (req, res) => {
        try {
            const followup = await Followup.find()
            res.json(followup)
        } catch (error) {
            console.log('Error al listar los seguimientos', error)
            res.status(500).json({ error: 'Error al listar los seguimiento' })
        }
    },
    // listar seguiminetos por ID
    getListFollowupById: async (req, res) => {
        try {
            const id = req.params.id
            const followup = await Followup.findById(id)
            res.json(followup)
        }
        catch (error) {
            console.log('Error al listar los seguimientos por ID', error)
            res.status(500).json({ error: 'Error al listar los seguimientos por ID' })
        }
    },
    //Listar seguimientos por instructor asignado 
    getListFollowUpInstructorByAssignment: async (req, res) => {
        try {
            const idAssignment = req.params.id
            const followup = await Followup.find(idAssignment)
            res.json(followup)
        }
        catch (error) {
            console.error('Error al listar los seguiminetos por asignacion', error)
            res.status(500).json({ error: 'Error al listar los seguimientos por asignacion' })
        }
    },
    // listar seguiminetos por instructor
    getListFollowupByInstructor: async (req, res) => {
        try {
            const idInstructor = req.params.id
            const followup = await Followup.find(idInstructor)
            res.json(followup)
        }
        catch (error) {
            console.error('Error al listar los seguimientos por instructor', error)
            res.status(500).json({ error: 'Error al listar los seguimientos por instructor' })
        }
    },
    // añadir seguimiento
    postAddFollowup: async (req, res) => {
        try {
            const { assigment, instructor, number, month, document, status, users, observations} = req.body;

            // Llamar a la validación de creación
            // const validation = validateCreateFollowup(req.body);
            // if (!validation.valid) {
            //     return res.status(400).json({ error: validation.message });
            // }

            const followUp = new Followup({
                assigment,
                instructor,
                number,
                month,
                document,
                status,
                users,
                observations
            });

            await followUp.save();
            res.json(followUp);
        } catch (error) {
            console.error('Error al insertar un nuevo seguimiento', error);
            res.status(500).json({ error: 'Error al insertar un nuevo seguimiento' });
        }
    },
    // actualizar seguimiento
    putUpdateFollowupById: async (req, res) => {
        try {
            const { id } = req.params;
            const { updatedAt, ...newData } = req.body;

            // Llamar a la validación de actualización
            const validation = validateUpdateFollowup(req.body);
            if (!validation.valid) {
                return res.status(400).json({ error: validation.message });
            }

            const updateFollowup = await Followup.findByIdAndUpdate(
                id,
                { ...newData, updatedAt },
                { new: true }
            );

            if (!updateFollowup) {
                return res.status(404).json({ message: "Seguimiento no encontrado" });
            }
            res.status(200).json(updateFollowup);
        } catch (error) {
            res.status(500).json({ message: "Error actualizando el seguimiento", error });
        }
    },
    // habilitar  seguimiento
    putEnableFollowup: async (req, res) => {
        const id = req.params.id;
        try {
            const enableFollowup = await Followup.findOneAndUpdate({ id }, { estado: 1 }, { new: true });
            if (!enableFollowup) {
                return res.status(400).json({ msg: 'Seguimiento no encontrado' })
            }
            res.json({ message: 'Seguimiento activo', seguimiento: enableFollowup });
        } catch (error) {
            res.status(500).json({ message: 'Error al activar el seguimiento', error });
        }
    },
    // deshabilitar seguimiento
    putDisableFollowup: async (req, res) => {
        const id = req.params.id;
        try {
            const disableFollowup = await Followup.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!disableFollowup) {
                return res.status(404).json({ msg: 'Seguimiento no encontrado' });
            }
            res.json({ message: 'Seguimiento desactivo', seguimiento: disableFollowup });
        } catch (error) {
            res.status(500).json({ message: 'Error al desactivar el Followup', error })
        }
    }
};

module.exports = followupController
