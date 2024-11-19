const Apprentice = require("../models/apprentice.js");
const csvParser = require('csv-parser');
const fs = require('fs');  // Asegúrate de incluir esto al principio del archivo

const { generateJWT } = require('../middlewares/validateJWT');

const apprenticeController = {
    // Obtener todos los aprendices
    getListApprentices: async (req, res) => {
        try {
            const listApprentice = await Apprentice.find()
                .populate({ path: 'modality' })
            res.status(200).json({ listApprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    getFilterApprentices: async (req, res) => {
        try {
            const searchTerm = req.query.term;
            const results = await Apprentice.find({
                $or: [
                    { firstName: { $regex: searchTerm, $options: 'i' } },
                    { lastName: { $regex: searchTerm, $options: 'i' } },
                    { fiche: { $regex: searchTerm, $options: 'i' } },
                    { status: { $regex: searchTerm, $options: 'i' } },
                ],
            });
            res.status(200).json({ results });

        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Obtener a un aprendiz por ID
    getListApprenticesById: async (req, res) => {
        try {
            const id = req.params.id;
            const listApprenticesById = await Apprentice.findById(id);
            res.status(200).json({ listApprenticesById });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Obtener aprendices por ficha
    getListApprenticesByFiche: async (req, res) => {
        try {
            const idFiche = req.params.idFiche;
            const listApprenticesByFiche = await Apprentice.find({ fiche: idFiche });
            res.status(200).json({ listApprenticesByFiche });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Obtener aprendices por estado
    getListApprenticeByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            const listApprenticesByStatus = await Apprentice.find({ status });
            res.status(200).json({ listApprenticesByStatus });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postUploadFile: async (req, res) => {
        console.log(req.file);  // Agregar esto para verificar que el archivo llegó correctamente
        const filePath = req.file?.path;
      
        if (!filePath) {
          return res.status(400).json({ message: 'No se encontró el archivo en la solicitud' });
        }
      
        const aprendices = [];
        try {
          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
              aprendices.push(row);
            })
            .on('end', async () => {
              try {
                // Validar y guardar registros en la base de datos
                const savedRecords = await Apprentice.insertMany(aprendices, { ordered: false });
                res.status(201).json({ message: 'Registros subidos exitosamente', savedRecords });
              } catch (error) {
                console.error('Error al guardar registros:', error);
                res.status(500).json({ message: 'Error al procesar el archivo', error });
              } finally {
                // Eliminar el archivo temporal
                fs.unlinkSync(filePath);
              }
            });
        } catch (error) {
          console.error('Error al procesar la solicitud:', error);
          res.status(500).json({ message: 'Error al procesar la solicitud', error });
        }
      },
      
      
    // Añadir aprendiz
    postAddAprentice: async (req, res) => {
        try {
            const { tpdocument, numDocument, firstName, lastName, phone, institutionalEmail, personalEmail, fiche, modality, status } = req.body;
            const newApprentice = new Apprentice({
                tpdocument,
                numDocument,
                firstName,
                lastName,
                phone,
                institutionalEmail,
                personalEmail,
                fiche,
                modality,
                status
            });
            let apprenticeCreated = await newApprentice.save();
            res.status(200).json({ apprenticeCreated });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Iniciar sesión del aprendiz
    postLoginApprentice: async (req, res) => {
        try {
            const { numDocument, institutionalEmail } = req.body;
            const apprentice = await Apprentice.findOne({ numDocument, institutionalEmail });
            const token = await generateJWT(apprentice._id);
            res.status(200).json({ token, apprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Actualizar aprendiz
    putUpdateApprentice: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const updateApprentice = await Apprentice.findByIdAndUpdate(id, newData, { new: true });
            res.status(200).json({ updateApprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Habilitar aprendiz
    putEnableApprentice: async (req, res) => {
        try {
            const id = req.params.id;
            const enableApprentice = await Apprentice.findByIdAndUpdate(id, { status: 1 });
            res.json({ message: 'Aprendiz activo' });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Deshabilitar aprendiz
    putDisableApprentice: async (req, res) => {
        try {
            const id = req.params.id;
            const disableApprentice = await Apprentice.findByIdAndUpdate(id, { status: 0 });
            res.json({ message: 'Aprendiz Inactivo' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
};

module.exports = apprenticeController;