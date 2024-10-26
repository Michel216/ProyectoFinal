const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const { createBackupDb } = require('./utils/backup');

class Server {
    constructor() {
        this.app = express();
        this.port = process?.env?.PORT || 4040;
        this.MONGO_URI = process.env.MONGO_URI
        this.paths = {
            apprentice: '/api/apprentice',
            // assignment: '/api/assignment',
            binnacle: '/api/binnacles',
            followup: '/api/followup',
            log: '/api/logs',
            modality: '/api/modality',
            register: '/api/register'
        };
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors())
    }
    routes() {
        this.app.use(this.paths.apprentice, require('./routes/apprentice.js'));
        // this.app.use(this.paths.assignment, require('./routes/assignment.js'));
        this.app.use(this.paths.binnacle, require('./routes/binnacleEp.js'));
        this.app.use(this.paths.followup, require('./routes/followup.js'));
        this.app.use(this.paths.log, require('./routes/log.js'));
        this.app.use(this.paths.modality, require('./routes/modality.js'));
        this.app.use(this.paths.register, require('./routes/register.js'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor está funcionando en el puerto ${this.port}`);
            mongoose.connect(this.MONGO_URI).then(() => console.log('Connected!'))
        });
    }
    scheduleBackup() {
        cron.schedule('0 2 * * *', async () => {
            console.log('Iniciando copia de seguridad');
            const success = await createBackupDb();
            if (success) {
                console.log('Copia de seguridad completada con éxito');
            } else {
                console.log('Error al realizar la copia de seguridad');
            }
        });
    }
}
module.exports = Server