const Apprentice = require("../models/apprentice.js");
const { validateStatus } = require("./binnacleEp.js");
// Suponiendo que tienes un modelo de Instructor, lo importarías así
// const Instructor = require("../models/instructor.js");

const apprenticeHelper = {
    validateApprentice: async (id) => {
        // Valida que exista el Id del aprendiz en la base de datos
        let existApprentice = await Apprentice.findById(id);
        if (!existApprentice) {
            throw new Error("El aprendiz no existe en la base de datos");
        }
    },
    validateNumDocument: async (numDocument) => {
        let existNumDocument = await Apprentice.findOne({ numDocument });
        if (existNumDocument) {
            throw new Error("El número del documentó ya existe");
        }
    },
    validatePhone: async (phone) => {
        let existPhone = await Apprentice.findOne({ phone });
        if (existPhone) {
            throw new Error("El télefono ya existe");
        }
    },
    validateEmail: async (email) => {
        let existEmail = await Apprentice.findOne({ email });
        if (existEmail) {
            throw new Error("El correo ya existe");
        }
    },
    validateStatus:  (status) => {
        if (status != 0 || status != 1) {
            throw new Error("El estado debe ser 1 o 0");
        }else{
            return true;
        }
    },
    validateStatus:  (status) =>{
        const Status =[0,1];
        if(!Status.includes(status)){
            throw new Error("El estado debe ser 0 o 1");
    }
    return true;
},
    validateTpDocument: async (tpdoc) => {
        const tpdocumentValidos = ["cédula de ciudadanía", "tarjeta de identidad", "cédula de extranjería"];
        if (!tpdocumentValidos.includes(tpdoc)) {
            throw new Error("El tipo de documento bede ser 'cédula de ciudadanía','tarjeta de identidad','cedula de extranjería'");
        }
        return true
    },

    validateFiche:async (idFiche) =>{
        let exisIdFiche = await axios.get(`http://89.116.49.65:4500/api/fiches/${idFiche}`,{
            headers:{
                "token":process.env.TOKEN
            }
        });
        if (!exisIdFiche){
            throw new Error("La ficha no existe");
        } 
        return true;
    },

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
   
    validatePhoneIfIsDifferent: async (phone, id) => {
        let apprentice = await Apprentice.findById(id);
    
        // Validar si el número de teléfono es diferente
        if (phone && phone !== apprentice.phone) {
            let existPhone = await Apprentice.findOne({ phone });
            if (existPhone) {
                throw new Error("El número de teléfono ya existe");
            }
        }
    
        return true;
    },

    validateEmailIfIsDifferent: async (email, id) => {
        let apprentice = await Apprentice.findById(id);
    
        // Validar si el correo electrónico es diferente
        if (email && email !== apprentice.email) {
            let existEmail = await Apprentice.findOne({ email });
            if (existEmail) {
                throw new Error("El correo electrónico ya existe");
            }
        }
    
        return true;
    }
};
module.exports = apprenticeHelper;