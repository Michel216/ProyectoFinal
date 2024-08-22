const Apprentice = require("../models/apprentice.js");
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
    // Valida que el estado sea válido (1 o 0)
    validateStatus: async (status) => {
        if (!status) {
            throw new Error("Error al listar por estado");
        }
        if (status !== '1' && status !== '0') {
            throw new Error("Estado inválido");
        }
    },

    // Valida que el número de teléfono tenga excatamente 10 números 
    validatePhone: async (phone) => {
        if (!/^\d{10}$/.test(phone)) {
            throw new Error("El número de teléfono debe tener 10 números")
        }
    },
    //valida que la cédula tenga entre 8 y 10
    validateDocumento: async (cedula) => {
        if (!/^\d{8,10}$/.test(cedula)){
            throw new Error("La cédula debe tener entre 8 y 10 números")
        }
    }
    // validateApprentice: async (idInstructor) => {
    //     // Valida que el instructor exista en la base de datos
    //     let existInstructor = await Instructor.findOne({ _id: idInstructor });
    //     if (!existInstructor) {
    //         throw new Error("El instructor no existe en la base de datos");
    //     }
    // }
};

module.exports = apprenticeHelper;
