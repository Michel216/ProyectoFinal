const Apprentice = require("../models/apprentice.js");
const csvParser = require('csv-parser');
const apprenticeHelper= require('../helpers/apprentice.js')
const fs = require('fs');  // Asegúrate de incluir esto al principio del archivo
const iconv = require('iconv-lite'); // Importar iconv-lite
const chardet = require('chardet');
 
const {generateJWT} = require('./../middlewares/validateJWT.js');


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

    getListCertificatedApprentice: async (req, res) => {
        try {
            const listCertificatedApprentice = await Apprentice.find({ status: { $in: [3, 4] } });
            res.status(200).json({ listCertificatedApprentice });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postUploadFile: async (req, res) => {
        const filePath = req.file?.path;
    
        if (!filePath) {
            return res.status(400).json({ message: 'No se encontró el archivo en la solicitud' });
        }
    
        try {
            const aprendices = [];
            const errores = [];
    
            // Leer y procesar el archivo CSV
            const readStream = fs.createReadStream(filePath)
                .pipe(iconv.decodeStream('utf-8'))
                .pipe(csvParser());
    
            for await (const row of readStream) {
                // Validar cada fila
                const validationErrors = await apprenticeHelper.validateApprenticeCsv(row);
    
                if (validationErrors.length > 0) {
                    errores.push({ fila: row, errores: validationErrors });
                } else {
                    aprendices.push(row);
                }
            }
    
            // Si hay errores, no guardar en la base de datos
            if (errores.length > 0) {
                return res.status(400).json({
                    message: 'Errores encontrados durante el procesamiento',
                    guardados: 0,
                    errores,
                });
            }
    
            // Guardar registros válidos si no hay errores
            let savedRecords = [];
            if (aprendices.length > 0) {
                savedRecords = await Apprentice.insertMany(aprendices, { ordered: false });
            }
    
            res.status(201).json({
                message: 'Registros subidos exitosamente',
                guardados: savedRecords.length,
                errores: [],
            });
          }  catch (error) {
                console.error('Error al procesar el archivo:', error); // Agregar más detalles
                res.status(500).json({
                    message: 'Error al procesar el archivo',
                    error: error.message || 'Error desconocido',
                    stack: error.stack || 'Sin stack disponible'
                });

                    } finally {
            fs.unlinkSync(filePath); // Eliminar el archivo temporal
        }
    },
    
    
    // Añadir aprendiz
   
    // postuploadFile: async (req, res) => {
    //     if (!req.file) {
    //         return res.status(400).json({ message: "No se ha subido ningún archivo." });
    //     }
    
    //     const filePath = req.file.path;
    //     const aprendices = [];
    
    //     // Procesar el archivo CSV
    //     fs.createReadStream(filePath)
    //         .pipe(csvParser())
    //         .on("data", (row) => {
    //             // Log de los datos del CSV para asegurarte de que se está leyendo correctamente
    //             console.log("Fila CSV:", row);
    //             aprendices.push({
    //                 tpdocument: row.tpdocument,
    //                 numDocument: row.numDocument,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName,
    //                 phone: row.phone,
    //                 institutionalEmail: row.institutionalEmail,
    //                 personalEmail: row.personalEmail,
    //                 fiche: row.fiche,
    //                 modality: row.modality,
    //             });
    //         })
    //         .on("end", async () => {
    //             console.log("Datos de aprendices:", aprendices); // Verifica que los datos están en el formato correcto
    
    //             // Verificar si el archivo está vacío o no contiene datos válidos
    //             if (aprendices.length === 0) {
    //                 return res.status(400).json({ message: "El archivo CSV está vacío o no contiene datos válidos." });
    //             }
    
    //             try {
    //                 // Intentar guardar los registros en la base de datos
    //                 const savedRecords = await Apprentice.insertMany(aprendices, { ordered: false });
    //                 res.status(201).json({
    //                     message: "Registros subidos exitosamente",
    //                     savedRecords,
    //                 });
    //             } catch (error) {
    //                 console.error("Error al guardar registros:", error);
    //                 if (error.name === "BulkWriteError") {
    //                     return res.status(400).json({
    //                         message: "Algunos registros no pudieron ser guardados.",
    //                         errors: error.writeErrors.map((e) => e.errmsg),
    //                     });
    //                 }
    //                 res.status(500).json({ message: "Error al procesar el archivo", error: error.message });
    //             } finally {
    //                 // Eliminar el archivo CSV después de procesarlo
    //                 fs.promises.unlink(filePath).catch(console.error);
    //             }
    //         })
    //         .on("error", (error) => {
    //             console.error("Error al procesar el archivo CSV:", error);
    //             res.status(500).json({ message: "Error al procesar el archivo", error: error.message });
    //         });
    // },

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
            
            if (!apprentice) {
                return res.status(404).json({ error: 'Aprendiz no encontrado' });
            }
    
            const token = await generateJWT(apprentice._id);
            res.status(200).json({ token, apprentice });
        } catch (error) {
            res.status(400).json({ error: error.message });
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