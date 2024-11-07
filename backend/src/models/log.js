const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: { type: Object, required: true, }, 
    action: { type: String,  default: "NO SE HA REGISTRADO UNA ACCION", required: true },
    information: { type: Object, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Logs", logsSchema);

