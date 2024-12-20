const Apprentice = require("../models/apprentice.js");
const Modality = require("./../models/modality.js")

const apprenticeHelper = {
    // Valida que exista el Id del aprendiz en la base de datos
    validateApprentice: async (id) => {
        let existApprentice = await Apprentice.findById(id);
        if (!existApprentice) {
            throw new Error("El aprendiz no existe en la base de datos");
        } return true
    },
    // válida que no se repita el número de documento
    validateNumDocument: async (numDocument) => {
        let existNumDocument = await Apprentice.findOne({ numDocument });
        if (existNumDocument) {
            throw new Error("El número del documentó ya existe");
        } return true
    },
    // válida que no se repita el número de documento
    validateNoNumDocument: async (numDocument) => {
        let existNumDocument = await Apprentice.findOne({ numDocument });
        if (!existNumDocument) {
            throw new Error("El número del documentó no existe en la base de datos");
        } return true
    },
    // válida que no se repita el teléfono
    validatePhone: async (phone) => {
        let existPhone = await Apprentice.findOne({ phone });
        if (existPhone) {
            throw new Error("El télefono ya existe");
        } return true
    },
    // válida que no se repita el email institucional
    validateInstitutionalEmail: async (institutionalEmail) => {
        let existEmail = await Apprentice.findOne({ institutionalEmail });
        if (existEmail) {
            throw new Error("El correo institucional ya existe");
        } return true
    },
    // válida que no se repita el email institucional
    validateNoInstitutionalEmail: async (institutionalEmail) => {
        let existEmail = await Apprentice.findOne({ institutionalEmail });
        if (!existEmail) {
            throw new Error("El correo no existe en la base de datos");
        } return true
    },
    // válida que no se repita el email personal
    validatePersonalEmail: async (personalEmail) => {
        let existEmail = await Apprentice.findOne({ personalEmail });
        if (existEmail) {
            throw new Error("El correo personal ya existe");
        } return true
    },
    // válida que el tipo de documento sea permitido
    validateTpDocument: async (tpdoc) => {
        const tpdocumentValidos = ["cédula de ciudadanía", "tarjeta de identidad", "cédula de extranjería"];
        if (!tpdocumentValidos.includes(tpdoc)) {
            throw new Error("El tipo de documento debe ser 'cédula de ciudadanía','tarjeta de identidad','cedula de extranjería'");
        } return true
    },
    // válida que la modalidad exista en la base de datos
    validateModality: async (modality) => {
        let exisIdModality = await Modality.findById(modality)
        if (!exisIdModality) {
            throw new Error("La modalidad no existe en la base de datos");
        } else if (exisIdModality.status === 0) {
            throw new Error("La modalidad no está activa");
        } return true
    },
    // válida que no se repita el número de documento
    validateNumDocumentIfIsDiferent: async (numDocument, id) => {
        let apprentice = await Apprentice.findById(id);
        if (numDocument && numDocument !== apprentice.numDocument) {
            let existNumDocument = await Apprentice.findOne({ numDocument });
            if (existNumDocument) {
                throw new Error("El número de documento ya existe");
            } else {
                return true
            }
        } else {
            return true
        }
    },
    // Validar si el número de teléfono es diferente
    validatePhoneIfIsDifferent: async (phone, id) => {
        let apprentice = await Apprentice.findById(id);

        if (phone && phone !== apprentice.phone) {
            let existPhone = await Apprentice.findOne({ phone });
            if (existPhone) {
                throw new Error("El número de teléfono ya existe");
            }
        }

        return true;
    },
    // Validar si el correo institucional es diferente
    validateInstitutionalEmailIfIsDifferent: async (institutionalEmail, id) => {
        let apprentice = await Apprentice.findById(id);
        if (institutionalEmail && institutionalEmail !== apprentice.institutionalEmail) {
            let existEmail = await Apprentice.findOne({ institutionalEmail });
            if (existEmail) {
                throw new Error("El correo institucional ya existe");
            }
        }

        return true;
    },

    // Validar si el correo personal es diferente
    validatePersonalEmailIfIsDifferent: async (personalEmail, id) => {
        let apprentice = await Apprentice.findById(id);
        if (personalEmail && personalEmail !== apprentice.personalEmail) {
            let existEmail = await Apprentice.findOne({ personalEmail });
            if (existEmail) {
                throw new Error("El correo personal ya existe");
            }
        }

        return true;
    },
    // válida que el aprendiz exista en la base de datos
    validateLogin: async (numDocument, institutionalEmail) => {
        const apprentice = await Apprentice.findOne({ numDocument, institutionalEmail });
        if (!apprentice) {
            throw new Error('No se encontró un aprendiz con estos datos');
        }
    },
    
    validateStatusEmail: async (institutionalEmail) => {
        let existUser = await Apprentice.findOne({ institutionalEmail });
        if (existUser.status === 0) {
            throw new Error("El aprendiz está inactivo");
        } return true

    },
    validateApprenticeCsv: async (apprentice) => {
        const errors = [];
    
        // Validar campos obligatorios
        if (!apprentice.nombre) errors.push('El nombre es obligatorio');
        if (!apprentice.email) errors.push('El correo es obligatorio');
        if (!apprentice.documento) errors.push('El documento es obligatorio');
    
        // Validar formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (apprentice.email && !emailRegex.test(apprentice.email)) {
            errors.push('El formato del correo es inválido');
        }
    
        // Validar unicidad del correo o documento en la base de datos
        const existing = await Apprentice.findOne({
            $or: [{ email: apprentice.email }, { documento: apprentice.documento }],
        });
    
        if (existing) {
            if (existing.email === apprentice.email) {
                errors.push(`El correo ${apprentice.email} ya está registrado`);
            }
            if (existing.documento === apprentice.documento) {
                errors.push(`El documento ${apprentice.documento} ya está registrado`);
            }
        }
    
        return errors;
    }
    
};

module.exports = apprenticeHelper;