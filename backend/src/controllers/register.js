
const Register = require("../models/register.js")
const Modality = require("./../models/modality.js")

const register = {
    //Listar todos los registros 
    listallregister: async (req, res) => {
        try {
            const register = await Register.find()
                .populate({ path: 'apprentice' })
                .populate({ path: 'modality' })
                .exec();
            res.status(200).json({ register });
        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: 'error al listar los registros', });
        }
    },

    //listar registro por id  
    getlistregisterbyid: async (req, res) => {
        try {
            const id = req.params.id
            const listRegisterById = await Register.findById(id);
            res.status(200).json({ listRegisterById });

        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: 'error al listar registro por ID' })
        }
    },

    //listar registro por aprendiz
    getListRegisterByApprentice: async (req, res) => {
        try {
            const { idApprentice } = req.params;
    
            // Obtener registros asociados al aprendiz
            const listRegisterByApprentice = await Register.find({ apprentice: idApprentice }).populate("modality");
    
            if (!listRegisterByApprentice || listRegisterByApprentice.length === 0) {
                return res.status(404).json({ message: "No se encontraron registros para el aprendiz proporcionado." });
            }

            // Modalidades y asignaciones válidas
            const validModalities = {
                "PASANTIA": ["followupInstructor"],
                "VINCULO LABORAL": ["followupInstructor"],
                "UNIDAD PRODUCTIVA FAMILIAR": ["followupInstructor"],
                "CONTRATO DE APRENDIZAJE": ["followupInstructor"],
                "PROYECTO EMPRESARIAL": ["followupInstructor", "technicalInstructor", "projectInstructor"],
                "PROYECTO PRODUCTIVO": ["followupInstructor", "technicalInstructor"],
                "PROYECTO PRODUCTIVO  I+D": ["followupInstructor", "technicalInstructor", "projectInstructor"],
                "PROYECTO SOCIAL": ["followupInstructor", "technicalInstructor"]
            };

            // Verificar las modalidades y asignaciones permitidas para cada registro
            const response = listRegisterByApprentice.map(register => {
                const modalityName = register.modality?.name;
                const allowedAssignments = validModalities[modalityName] || [];
                return {
                    registerId: register._id,
                    modality: modalityName || "Sin modalidad",
                    allowedAssignments
                };
            });

            res.status(200).json({
                success: true,
                message: "Registros obtenidos correctamente.",
                data: response
            });
        } catch (error) {
            console.error("Error al listar los registros por aprendiz:", error);
            res.status(500).json({ error: "Error al listar los registros del aprendiz." });
        }
    },

    //listar por modalidad 
    getlistregisterbymodality: async (req, res) => {
        try {
            const idModality = req.params.idModality
            const listregisterbymodality = await Register.find({modality: idmodality});
            res.status(200).json({ listregisterbymodality });
        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: 'error al listar el registro del id de la modalidad' })
        }
    },

    // Listar registro por fecha de inicio
    getlistregisterbystartdate: async (req, res) => {
        try {
            const { startDate } = req.body;
            const registers = await Register.find({startDate});
            res.status(200).json({ registers });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Listar registro por fecha de finalización
    getlistregisterbyenddate: async (req, res) => {
        try {
            const { endDate } = req.body;
            const registers = await Register.find({endDate});
            res.status(200).json({ registers });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    //agregar registro
    postaddregister: async (req, res) => {
        try {
            const {
                apprentice,
                modality,
                startDate,
                company,
                phonecompany,
                addresscompany,
                emailCompany,
                owner,
                docAlternative,
                hour,
                businessProyectHour,
                productiveProyectHour,
                assignment,
                certificationDoc,
                judymentPhoto
            } = req.body;

            // Validación de la fecha de inicio
            const start = new Date(startDate);
            if (isNaN(start)) {
                return res.status(400).json({ message: "startDate no es una fecha válida" });
            }

            // Validación de la modalidad
            const modalityData = await Modality.findById(modality);
            const { name } = modalityData;

            // Función para validar los instructores requeridos
            const validateInstructors = (requiredInstructors) => {
                if (!assignment) return null; // Omitir validación si assignment no está definido

                const providedInstructors = Object.keys(assignment);
                const missingInstructors = requiredInstructors.filter(instructor => !providedInstructors.includes(instructor));
                const invalidInstructors = providedInstructors.filter(instructor => !requiredInstructors.includes(instructor));

                if (missingInstructors.length > 0) {
                    return `Se requieren los instructores: ${missingInstructors.join(", ")}`;
                }
                if (invalidInstructors.length > 0) {
                    return `Instructores no permitidos: ${invalidInstructors.join(", ")}`;
                }
                return null;
            };

            // Validación de instructores según el tipo de modalidad
            let instructorError = null;
            if (name === "PROYECTO EMPRESARIAL" || name === "PROYECTO PRODUCTIVO I+D") {
                instructorError = validateInstructors(["projectInstructor", "technicalInstructor", "followUpInstructor"]);
            } else if (name === "PROYECTO SOCIAL" || name === "PROYECTO PRODUCTIVO") {
                instructorError = validateInstructors(["followUpInstructor", "technicalInstructor"]);
            } else if (["PASANTIA", "VÍNCULO LABORAL", "MONITORIAS", "UNIDAD PRODUCTIVA FAMILIAR", "CONTRATO DE APRENDIZAJE"].includes(name)) {
                instructorError = validateInstructors(["followUpInstructor"]);
            } else {
                instructorError = validateInstructors(["followUpInstructor"]);
            }

            if (instructorError) {
                return res.status(400).json({ message: instructorError });
            }

            // Validación de la cantidad de aprendices
            const apprenticeCount = Array.isArray(apprentice) ? apprentice.length : 1;
            const singleApprenticeModalities = ["VÍNCULO LABORAL", "MONITORIAS", "PASANTIA", "UNIDAD PRODUCTIVA FAMILIAR", "CONTRATO DE APRENDIZAJE"];

            if (singleApprenticeModalities.includes(name) && apprenticeCount !== 1) {
                return res.status(400).json({ message: "Solo se permite 1 aprendiz para esta modalidad" });
            } else if (!singleApprenticeModalities.includes(name) && apprenticeCount < 1) {
                return res.status(400).json({ message: "Se requiere al menos 1 aprendiz para esta modalidad" });
            }

            // Cálculo de la fecha de finalización
            const endDate = new Date(start);
            endDate.setMonth(endDate.getMonth() + 6);
            endDate.setDate(endDate.getDate() - 1);

            // Creación del nuevo registro
            const newregister = new Register({
                apprentice,
                modality,
                startDate,
                endDate,
                company,
                phonecompany,
                addresscompany,
                emailCompany,
                owner,
                docAlternative,
                hour,
                businessProyectHour,
                productiveProyectHour,
                assignment,
                certificationDoc,
                judymentPhoto
            });

            // Guardado del registro en la base de datos
            const createdRegister = await newregister.save();
            res.status(200).json({ success: true, data: createdRegister });

        } catch (error) {
            console.error("Error al crear registro:", error);
            return res.status(400).json({ message: error.message || "Error al crear el registro" });
        }
    },

    //actualizar registro por id
    updateregisterbyid: async (req, res) => {
        try {
            const id = req.params.id;
            const { startDate, company, phonecompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, emailCompany } = req.body;
            const registerID = await Register.findById(id);

            const start = new Date(startDate);
            const endDate = new Date(start);
            endDate.setMonth(endDate.getMonth() + 6);
            endDate.setDate(endDate.getDate() - 1);

            const updatedRegister = await Register.findByIdAndUpdate(id, { startDate, endDate, company, phonecompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, emailCompany }, { new: true })
            res.status(200).json({ updatedRegister })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar los datos del registro " })
        }
    },

    putUpdateModality: async (req, res) => {
        try {
            const id = req.params.id
            const { idModality } = req.body
            const registerID = await Register.findByIdAndUpdate(id, {modality: idModality})
            res.status(200).json({registerID})
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar los datos del registro " })
        }
    },

    //habilitar registro
    putenableregister: async (req, res) => {
        try {
            const id = req.params.id
            const enableRegister = await Register.findByIdAndUpdate(id, { status: 1 })
            res.status(200).json({ msg: "Registro activado", enableRegister })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al activar registro" })
        }
    },

    //deshabilitar registro
    putdisableregister: async (req, res) => {
        try {
            const id = req.params.id
            const disableRegister = await Register.findByIdAndUpdate(id, { status: 0 })
            res.status(200).json({ msg: "Registro desactivado", disableRegister })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al desactivar registro" })
        }
    },
    // putAddAssignment: async (req, res) => {
    //     const { apprentice, followInstructor, technicalInstructor, proyectInstructor } = req.body;

    //     try {
    //         // Busca el registro asociado al aprendiz
    //         const registerToApprentice = await Register.findOne({ apprentice });

    //         if (!registerToApprentice) {
    //             return res.status(404).json({ msg: "No se encontró un registro para el aprendiz especificado." });
    //         }

    //         // Crear el objeto de la nueva asignación
    //         const newAssignment = {
    //             followUpInstructor: followInstructor ? { name: followInstructor } : null,
    //             technicalInstructor: technicalInstructor ? { name: technicalInstructor } : null,
    //             projectInstructor: proyectInstructor ? { name: proyectInstructor } : null,
    //         };

    //         const updatedRegister = await Register.findByIdAndUpdate(
    //             registerToApprentice._id,
    //             { $push: { assignment: newAssignment } },
    //             { new: true } // Para devolver el documento actualizado
    //         );

    //         // Responder con el registro actualizado
    //         res.status(201).json({ updatedRegister });
    //     } catch (error) {
    //         console.error("Error al agregar la asignación:", error);
    //         res.status(500).json({ msg: "Error al agregar la asignación", error });
    //     }
    // },

    addAssignment: async (req, res) => {
        const { apprentice, assignment } = req.body;

        try {
            // Validación del ID
            // if (!id || typeof id !== "string") {
            //     return res.status(400).json({ message: "ID inválido o no proporcionado" });
            // }

            // Buscar el registro en la base de datos
            const register = await Register.findOne({ apprentice }).populate("modality");
            if (!register) {
                return res.status(404).json({ message: "Registro no encontrado para el aprendiz" });
            }


            // Modalidades y tipos de instructores permitidos
            const validModalities = {
                "PASANTIA": ["followupInstructor"],
                "VINCULO LABORAL": ["followupInstructor"],
                "UNIDAD PRODUCTIVA FAMILIAR": ["followupInstructor"],
                "CONTRATO DE APRENDIZAJE": ["followupInstructor"],
                "PROYECTO EMPRESARIAL": ["followupInstructor", "technicalInstructor", "projectInstructor"],
                "PROYECTO PRODUCTIVO": ["followupInstructor", "technicalInstructor"],
                "PROYECTO PRODUCTIVO  I+D": ["followupInstructor", "technicalInstructor", "projectInstructor"],
                "PROYECTO SOCIAL": ["followupInstructor", "technicalInstructor"]
            };

            const modalityName = register.modality?.name;
            const allowedAssignments = validModalities[modalityName];

            if (!allowedAssignments) {
                return res.status(400).json({
                    message: `La modalidad "${modalityName}" no permite asignaciones.`
                });
            }

            // Si no se envió la asignación, devolver los roles permitidos
            if (!assignment) {
                return res.status(200).json({
                    success: true,
                    message: "Roles permitidos para esta modalidad",
                    allowedAssignments
                });
            }

            // Validar que la asignación sea un objeto válido
            if (typeof assignment !== "object") {
                return res.status(400).json({ message: "La asignación no es válida o no se proporcionó correctamente." });
            }

            // Crear o recuperar la asignación activa
            let currentAssignment = register.assignment.find(a => a.status === 1);
            if (!currentAssignment) {
                currentAssignment = { status: 1 };
                register.assignment.push(currentAssignment);
            }

            // Desactivar instructores previos en roles permitidos
            allowedAssignments.forEach(role => {
                if (currentAssignment[role]) {
                    currentAssignment[role].forEach(instructor => {
                        instructor.status = 0; // Desactivar instructores previos
                    });
                }
            });

            // Procesar y actualizar instructores enviados
            allowedAssignments.forEach(role => {
                if (assignment[role]) {
                    if (!Array.isArray(assignment[role])) {
                        assignment[role] = [assignment[role]]; // Convertir a arreglo si es un único instructor
                    }

                    assignment[role].forEach(instructor => {
                        if (!currentAssignment[role]) {
                            currentAssignment[role] = []; // Inicializar si no existe
                        }

                        const existingInstructor = currentAssignment[role].find(
                            existing =>
                                existing.idInstructor &&
                                existing.idInstructor.toString() === instructor.idInstructor.toString()
                        );

                        if (existingInstructor) {
                            // Actualizar datos del instructor existente
                            existingInstructor.name = instructor.name;
                            existingInstructor.email = instructor.email;
                            existingInstructor.status = 1; // Activar el instructor
                        } else {
                            // Agregar nuevo instructor
                            currentAssignment[role].push({
                                idInstructor: instructor.idInstructor,
                                name: instructor.name,
                                email: instructor.email,
                                status: 1 // Nuevo instructor activo
                            });
                        }
                    });
                }
            });

            // Guardar cambios en la base de datos
            await register.save();

            res.status(200).json({
                success: true,
                message: "Asignación actualizada correctamente",
                data: register
            });
        } catch (error) {
            console.error("Error al actualizar la asignación:", error);
            res.status(500).json({
                success: false,
                message: error.message || "Error al actualizar la asignación"
            });
        }
    },

    updateRegisterModality: async (req, res) => {
        const { id } = req.params;
        const { idModality, docAlternative } = req.body;
        try {
            const updatedModality = await Register.findByIdAndUpdate(id, { idModality, docAlternative }, { new: true });
            if (!updatedModality) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }
            res.json({ success: true, data: updatedModality });
        } catch (error) {
            console.log('Error al actualizar modalidad', error);
            res.status(500).json({ error: 'Error al actualizar modalidad' });
        }

    }
}

module.exports = register;

