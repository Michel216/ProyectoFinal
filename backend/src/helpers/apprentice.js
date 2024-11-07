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
    // válida que el estado sea permitido
    validateStatus: (status) => {
        const validStatus = [0, 1, 2, 3, 4];// inactivo: 0, activo: 1, en etapa productiva: 2, por certificación: 3, certificado: 4
        if (!validStatus.includes(status)) {
            throw new Error("El estado debe ser 0 a 4");
        } return true;
    },
    // válida que el tipo de documento sea permitido
    validateTpDocument: async (tpdoc) => {
        const tpdocumentValidos = ["cédula de ciudadanía", "tarjeta de identidad", "cédula de extranjería"];
        if (!tpdocumentValidos.includes(tpdoc)) {
            throw new Error("El tipo de documento bede ser 'cédula de ciudadanía','tarjeta de identidad','cedula de extranjería'");
        } return true
    },
    // válida que la modalidad exista en la base de datos
    validateModality: async (modality) => {
        let exisIdModality = await Modality.findById(modality)
        if (!exisIdModality) {
            throw new Error("La modalidad no existe en la base de datos");
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
        let existUser = await Apprentice.findOne({ institutionalEmail, numDocument });
        if (!existUser) {
            throw new Error("El correo electrónico o el número de documento no es válido");
        } return true
    },
    validateStatus: async (institutionalEmail) => {
        let existUser = await Apprentice.findOne({ institutionalEmail });
        if (existUser.status === 0) {
            throw new Error("El aprendiz está inactivo");
        } return true

    },
    validateModalityStatus: async (modality) => {
        let modalityActive = await Modality.findById(modality);
        if (modalityActive.status === 0) {
            throw new Error("La modalidad está inactiva");
        } return true
    }
};
module.exports = apprenticeHelper;