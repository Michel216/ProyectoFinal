const Register = require("../models/register.js")
const Modality = require("./../models/modality.js")

const register = {
    //Listar todos los registros 
    listallregister: async (req, res) => {
        try {
            const register = await Register.find()
                .populate({ path: 'apprentice' })
                .populate({ path: 'modality' })
                // .populate({ path: 'fiche' })
                .exec();
            res.json({ register });
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
            res.json({ listRegisterById });

        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: 'error al listar registro por ID' })
        }
    },

    //listar registro por aprendiz
    getlistregisterbyapprentice: async (req, res) => {

        try {
            const idapprentice = req.params.idapprentice
            const listRegisterByapprentice = await Register.find({ apprentice: idapprentice });
            res.json({ listRegisterByapprentice });

        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: 'error al listar el registro del id del aprendiz ' })
        }

    },

    //listar por ficha

    getlistregisterbyfiche: async (req, res) => {

        try {
            const id = req.params.id
            const listregisterbyfiche = await Register.find(id);
            res.json({ listregisterbyfiche });

        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: 'error al listar el registro del id de la ficha' })
        }
    },

    //listar por modalidad 

    getlistregisterbymodality: async (req, res) => {
        try {
            const id = req.params.id
            const listregisterbymodality = await Register.findOne(id);
            res.json({ listregisterbymodality });

        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: 'error al listar el registro del id de la modalidad' })
        }
    },

   // Listar registro por fecha de inicio
getlistregisterbystartdate: async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const query = {};

            if (startDate) {
                query.startDate = { $gte: new Date(startDate) }; // Asumiendo que el campo es 'startDate'
            }
            if (endDate) {
                query.endDate = { $lte: new Date(endDate) }; // Asumiendo que el campo es 'endDate'
            }

            const registers = await Register.find(query);
            res.json({ registers });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Listar registro por fecha de finalización
    getlistregisterbyenddate: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const query = {};

            if (startDate) {
                query.startDate = { $gte: new Date(startDate) }; // Asumiendo que el campo es 'startDate'
            }
            if (endDate) {
                query.endDate = { $lte: new Date(endDate) }; // Asumiendo que el campo es 'endDate'
            }

            const registers = await Register.find(query);
            res.json({ registers });
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
            if (!modalityData) {
                return res.status(400).json({ message: "Modalidad no encontrada" });
            }
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
            return res.status(201).json({ success: true, data: createdRegister });
    
        } catch (error) {
            console.error("Error al crear registro:", error);
            return res.status(400).json({ message: error.message || "Error al crear el registro" });
        }
    },

    //actualizar registro por id
    updateregisterbyid: async (req, res) => {
        try {
            const id = req.params.id;
            const { startDate, company, phonecompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, mailCompany } = req.body;
            const registerID = await Register.findById(id);
            if (!registerID) {
                return res.status(404).json({ msg: "Registro no encontrado" });
            }

            const start = new Date(startDate);
            const endDate = new Date(start);
            endDate.setMonth(endDate.getMonth() + 6);
            endDate.setDate(endDate.getDate() - 1);

            const updatedRegister = await Register.findByIdAndUpdate(id,{ startDate, endDate, company, phonecompany, addressCompany, owner, hour, businessProyectHour, productiveProjectHour, mailCompany }, { new: true })
            res.json({ updatedRegister })
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
            res.json({ msg: "Registro activado", enableRegister })
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
            res.json({ msg: "Registro desactivado", disableRegister })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al desactivar registro" })
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

