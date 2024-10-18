const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    users: { type: String, required: true, minlength: 10 },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, 
    action: { type: String, required: true, maxlength: 5 },
    information: { type: Object, required: true, minlength: 20 },
}, { timestamps: true });

module.exports = mongoose.model("Logs", logsSchema);

