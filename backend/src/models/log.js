const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    name: { type: String, required: true }, // USUARIO
    data: { type: String, required: true, }, // tipo de cambio PUT POST
    action: { type: String,  default: "NO SE HA REGISTRADO UNA ACCION", required: true }, // ESPECIFICA
    information: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Logs", logsSchema);

