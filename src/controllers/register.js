const Register = require("../models/register.js")

//listar todo

const register = {
    listallregister: async (req, res) => {
        try {
            const register = await Register.find();
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
            const id = req.params.id
            const listRegisterByapprentice = await Register.findById(id);
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

    //listar registro por fecha de inicio
    getlistregisterbystartdate: async (req, res) => {

        try {
            const { startDate, endDate } = req.body;
            const query = {};

            if (startDate && endDate) {
                query.fecha = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                };
            }

            const register = await Register.find(query);
            res.json({ register });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    //listar registro por fecha de finalizacion
    getlistregisterbyenddate: async (req, res) => {
        try {
            const { startDate, endDate } = req.body;
            const query = {};

            if (startDate && endDate) {
                query.fechaFinalizacion = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                };
            }

            const registers = await Register.find(query);
            res.json({ registers });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    //agregar registro

    postaddregister: async (req, res) => {
        try {
            const { apprentice, modality, startDate, endDate , company, phonecompany, addresscompany, owner, docalternative, hour } = req.body
            const newregister = new Register({ apprentice, modality, startDate , endDate, company, phonecompany, addresscompany, owner, docalternative, hour })
            await newregister.save()
            res.json({ newregister })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al crear el registro " })
        }
    },

    //actualizar registro por id

    updateregisterbyid: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body
            const updatedRegister = await Register.findByIdAndUpdate(id, newData, {new: true})
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
            res.json({ msg: "Registro activado" })
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
            res.json({ msg: "Registro desactivado" })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al desactivar registro" })
        }
    }

}

module.exports = register;

