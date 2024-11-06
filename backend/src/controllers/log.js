const Log = require("../models/log.js")

const logController = {

    //listar logs
    getlistlogs: async (req, res) => {

        try {
            const logController = await Log.find();
            res.json({ logController });

        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: 'error al listar los registros de log' })
        }
    },
    //listar logs por id
    getlistlogsbyid: async (req, res) => {
        try {
            const id = req.params.id
            const listlogsbyid = await Log.findById(id);
            res.json({ listlogsbyid });

        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: 'error al listar los registros por ID' })
        }
    },
    //agregar log
    postaddlog: async (req, res) => {
        try {
            const { users,email, action, information} = req.body
            const newlog = new Log ({ users, email, action, information})
            await newlog.save()
            res.json({ newlog })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al crear el registro en log " })
        }
    },

    // PUT: Modificar aprendiz
    putupdateLog: async (req, res) => {
        const { id } = req.params;
    const { users, action, information, data } = req.body;
    try {
        const log = await Log.findByIdAndUpdate(id, { users, action, information, data }, { new: true });
        res.json({ log });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},
    //habilitar log
    putenablelogsbyid: async (req, res) => {
        try {
            const id = req.params.id
            const enableLog = await Log.findByIdAndUpdate(id, { status: 1 })
            res.json({ msg: "Registro activado",enableLog })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al activar registro" })
        }
    },

    //deshabilitar log
    putdisablelogsbyid: async (req, res) => {
        try {
            const id = req.params.id
            const disableLog = await Log.findByIdAndUpdate(id, { status: 0 })
            res.json({ msg: "Registro desactivado",disableLog })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al desactivar registro" })
        }
    }
}

module.exports = logController;