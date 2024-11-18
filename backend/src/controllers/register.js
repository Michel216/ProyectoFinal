const Register = require("../models/register.js")

const register = {
    //Listar todos los registros 
    listallregister: async (req, res) => {
        try {
            const register = await Register.find()
                .populate({ path: 'apprentice' })
                .populate({ path: 'modality' })
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
            const { apprentice, modality, startDate, endDate, company, phonecompany, addresscompany, emailCompany, owner, docAlternative, hour, businessProyectHour,assignment, certificationDoc, judymentPhoto } = req.body;

            const newregister = new Register({
                apprentice,
                modality,
                startDate,
                endDate,
                company,
                phonecompany,
                addresscompany,
                owner,
                docAlternative,
                hour,
                businessProyectHour,
                emailCompany,
                assignment,
                certificationDoc,
                judymentPhoto
            });

            await newregister.save();
            return res.json({ newregister });

        } catch (error) {
            console.error(error);

            return res.status(400).json({ error: "Error al crear el registro" });
        }
    },

    // Actualizar los datos del registro 
    updateModalityregister: async (req, res) => {
        try {
            const modalityId = req.params.id; // ID de la modalidad desde la URL
            const newData = req.body; // Datos a actualizar


            const updatedRegister = await Register.findOneAndUpdate({ modality: modalityId }, newData, { new: true }
            );
            res.json({ updatedRegister })

        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error al modificar los datos del registro" });
        }
    },
    //actualizar registro por id

    updateregisterbyid: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body
            const updatedRegister = await Register.findByIdAndUpdate(id, newData, { new: true })
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

