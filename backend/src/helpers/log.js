const Log = require("../models/log.js")

const logHelper = {
    validateId: async (id) => {
        const existLog = await Log.findById(id)
        if (!existLog) {
            throw new Error("El log no existe en la base de datos")
        } return true
    }
}

module.exports = logHelper