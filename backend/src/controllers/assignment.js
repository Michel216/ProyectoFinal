const mongoose = require('mongoose');
const Assignment = require('../models/assignment');
const nodemailer = require('nodemailer');

const assignmentController = {
    // Obtener todas las asignaciones
    getListAssignment: async (req, res) => {
        try {
            const assignments = await Assignment.find() 
            .populate({ path: 'register' })
            .populate({path: "followInstructor"})
            .populate({path:"technicalInstructor"})
            .populate({path:"proyectInstructor"})
            .exec();
            res.json({assignments});
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
            res.json({assignment});
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
            res.json({assignments});
        } catch (error) {
            console.error('Error al listar las asignaciones por registro', error);
            res.status(500).json({ error: 'Error al listar las asignaciones por registro' });
        }
    },

    // Obtener asignaciones para un instructor de seguimiento por ID
    getListFollowUpInstructorById: async (req, res) => {
        const id = req.params.id;
        try {
            const assignments = await Assignment.find({ followInstructor: id })
                .populate('followInstructor', 'name email')
                .populate('register', 'name createdAt');

            res.json({assignments});
        } catch (error) {
            console.error('Error al listar las asignaciones para el instructor de seguimiento por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones para el instructor de seguimiento por ID' });
        }
    },

    // Obtener asignaciones para un instructor técnico por ID
    getListTechnicalInstructorById: async (req, res) => {
        const { id } = req.params;

        try {
            const assignments = await Assignment.find({ technicalInstructor: id })
                .populate('technicalInstructor', 'name email')
                .populate('register', 'name createdAt');

            res.json({assignments});
        } catch (error) {
            console.error('Error al listar las asignaciones para el instructor técnico por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones para el instructor técnico por ID' });
        }
    },

    // Obtener asignaciones para un instructor de proyecto por ID
    getListProjectInstructorById: async (req, res) => {
        const { id } = req.params;


        try {
            const assignments = await Assignment.find({ proyectInstructor: id })
                .populate('proyectInstructor', 'name email')
                .populate('register', 'name createdAt');

            res.json({assignments});
        } catch (error) {
            console.error('Error al listar las asignaciones para el instructor de proyecto por ID', error);
            res.status(500).json({ error: 'Error al listar las asignaciones para el instructor de proyecto por ID' });
        }
    },

    // Agregar una nueva asignación
    postAddAssignment: async (req, res) => {
        const { register, followInstructor, technicalInstructor, proyectInstructor, certificationdoc, judymenthphoto, observation, productiveStage } = req.body;

        let assignmentData = { register, certificationdoc, judymenthphoto, observation, productiveStage };

        if (followInstructor) assignmentData.followInstructor = followInstructor;
        if (technicalInstructor) assignmentData.technicalInstructor = technicalInstructor;
        if (proyectInstructor) assignmentData.proyectInstructor = proyectInstructor;

        try {
            const newAssignment = new Assignment(assignmentData);
            await newAssignment.save();
            res.status(201).json({newAssignment});
        } catch (error) {
            console.error('Error al crear la asignación', error);
            res.status(500).json({ msg: 'Error al crear la asignación', error });
        }
    },

    postSendEmail: async (req, res) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Extraer datos del cuerpo de la solicitud
        const {correoInstructor, correoEmpresa, correoAprendiz } = req.body;

        // Suponiendo que solo se conoce un destinatario por grupo
        const group1 = {
            to: [correoInstructor, 'correocoordinacion@example.com', 'correoetapasproductivas@example.com'], // Emails del primer grupo
            subject: 'Asunto para el Grupo 1',
            text: 'Contenido del correo para el Grupo 1',
        };

        const group2 = {
            to: [correoAprendiz, correoEmpresa, 'correoinstructor'], // Emails del segundo grupo
            subject: 'Asunto para el Grupo 2',
            text: 'Contenido del correo para el Grupo 2',
        };

        // Función para enviar un correo
        const sendEmail = (mailOptions) => {
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error al enviar correo:', error);
                        reject(error);
                    } else {
                        console.log('Correo enviado: ' + info.response);
                        resolve(info);
                    }
                });
            });
        };

        try {
            // Enviar correos para el primer grupo
            await sendEmail({
                from: process.env.EMAIL_USER,
                to: group1.to.join(','),
                subject: group1.subject,
                text: group1.text,
            });

            // Enviar correos para el segundo grupo
            await sendEmail({
                from: process.env.EMAIL_USER,
                to: group2.to.join(','),
                subject: group2.subject,
                text: group2.text,
            });

            // Respuesta de éxito
            res.status(200).json({ message: 'Correos enviados con éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error al enviar uno o más correos' });
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
