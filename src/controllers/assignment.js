const mongoose = require('mongoose');
const Assignment = require('../models/assignment');

const assignmentController = {
    // Obtener todas las asignaciones
    getListAssignment: async (req, res) => {
        try {
            const assignments = await Assignment.find();
            res.json(assignments);
        } catch (error) {
            console.error('Error al listar las asignaciones', error);
            res.status(500).json({ error: 'Error al listar las asignaciones' });
        }
    },

    // Obtener asignación por ID
    getListAssignmentById: async (req, res) => {
        try {
            const id = req.params.id;
            const assignment = await Assignment.findById(id);
            res.json(assignment);
        } catch (error) {
            console.error('Error al listar las asignaciones por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones por ID' });
        }
    },

    // Obtener asignaciones por ID de registro
    getListAssignmentByRegister: async (req, res) => {
        try {
            const idRegister = req.params.idregister;
            const assignments = await Assignment.find({ register: idRegister });
            res.json(assignments);
        } catch (error) {
            console.error('Error al listar las asignaciones por registro', error);
            res.status(500).json({ error: 'Error al listar las asignaciones por registro' });
        }
    },

    // Obtener asignaciones para un instructor de seguimiento por ID
    getListFollowUpInstructorById: async (req, res) => {
        try {
            const id = req.params.id;

            const results = await Assignment.aggregate([
                { $match: { followInstructor: mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'instructors',
                        localField: 'followInstructor',
                        foreignField: '_id',
                        as: 'followInstructorDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'registers',
                        localField: 'register',
                        foreignField: '_id',
                        as: 'registerDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$followInstructorDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$registerDetails',
                        preserveNullAndEmptyArrays: true
                    }
                }
            ]);

            res.json(results);
        } catch (error) {
            console.error('Error al listar las asignaciones para el instructor de seguimiento por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones para el instructor de seguimiento por ID' });
        }
    },

    // Obtener asignaciones para un instructor técnico por ID
    getListTechnicalInstructorById: async (req, res) => {
        try {
            const id = req.params.id;

            const results = await Assignment.aggregate([
                { $match: { technicalInstructor: mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'instructors',
                        localField: 'technicalInstructor',
                        foreignField: '_id',
                        as: 'technicalInstructorDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'registers',
                        localField: 'register',
                        foreignField: '_id',
                        as: 'registerDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$technicalInstructorDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$registerDetails',
                        preserveNullAndEmptyArrays: true
                    }
                }
            ]);

            res.json(results);
        } catch (error) {
            console.error('Error al listar las asignaciones para el instructor técnico por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones para el instructor técnico por ID' });
        }
    },

    // Obtener asignaciones para un instructor de proyecto por ID
    getListProjectInstructorById: async (req, res) => {
        try {
            const id = req.params.id;

            const results = await Assignment.aggregate([
                { $match: { proyectInstructor: mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'instructors',
                        localField: 'proyectInstructor',
                        foreignField: '_id',
                        as: 'proyectInstructorDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'registers',
                        localField: 'register',
                        foreignField: '_id',
                        as: 'registerDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$proyectInstructorDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$registerDetails',
                        preserveNullAndEmptyArrays: true
                    }
                }
            ]);

            res.json(results);
        } catch (error) {
            console.error('Error al listar las asignaciones para el instructor de proyecto por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones para el instructor de proyecto por ID' });
        }
    },

    // Agregar una nueva asignación
    postAddAssignment: async (req, res) => {
        const { register, followInstructor, technicalInstructor, proyectInstructor, certificationdoc, judymenthphoto, observation, productiveStage } = req.body;
        
        // const validation = validateCreateFollowup(req.body);
        // if (!validation.valid) {
        //     return res.status(400).json({ error: validation.message });
        // }

        let assignmentData = { register, certificationdoc, judymenthphoto, observation, productiveStage};

        if (followInstructor) assignmentData.followInstructor = followInstructor;
        if (technicalInstructor) assignmentData.technicalInstructor = technicalInstructor;
        if (proyectInstructor) assignmentData.proyectInstructor = proyectInstructor;

        try {
            const newAssignment = new Assignment(assignmentData);
            await newAssignment.save();
            res.status(201).json(newAssignment);
        } catch (error) {
            console.error('Error al crear la asignación', error);
            res.status(500).json({ msg: 'Error al crear la asignación', error });
        }
    },

    // Actualizar una asignación por ID
    putUpdateAssignment: async (req, res) => {
        const id = req.params.id;
        const { updatedAt, ...newData } = req.body;
        try {
            const validation = validateUpdateA(req.body);
            if (!validation.valid) {
                return res.status(400).json({ error: validation.message });
            }
            const updatedAssignment = await Assignment.findByIdAndUpdate(id, newData, { new: true });
            if (!updatedAssignment) {
                return res.status(404).json({ msg: 'Asignación no encontrada' });
            }
            res.json({ message: 'Asignación actualizada', assignment: updatedAssignment });
        } catch (error) {
            console.error('Error al actualizar la asignación', error);
            res.status(500).json({ error: 'Error al actualizar la asignación' });
        }
    },
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

    // Habilitar una asignación por ID
    putEnableAssignment: async (req, res) => {
        const id = req.params.id;
        try {
            const enabledAssignment = await Assignment.findByIdAndUpdate(id, { status: 1 }, { new: true });
            if (!enabledAssignment) {
                return res.status(404).json({ msg: 'Asignación no encontrada' });
            }
            res.json({ message: 'Asignación habilitada', assignment: enabledAssignment });
        } catch (error) {
            console.error('Error al habilitar la asignación', error);
            res.status(500).json({ error: 'Error al habilitar la asignación' });
        }
    },

    // Deshabilitar una asignación por ID
    putDisableAssignment: async (req, res) => {
        const id = req.params.id;
        try {
            const disabledAssignment = await Assignment.findByIdAndUpdate(id, { status: 0 }, { new: true });
            if (!disabledAssignment) {
                return res.status(404).json({ msg: 'Asignación no encontrada' });
            }
            res.json({ message: 'Asignación deshabilitada', assignment: disabledAssignment });
        } catch (error) {
            console.error('Error al deshabilitar la asignación', error);
            res.status(500).json({ error: 'Error al deshabilitar la asignación' });
        }
    },
}

module.exports = assignmentController;
