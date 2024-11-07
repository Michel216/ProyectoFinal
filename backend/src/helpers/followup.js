const Followup = require("../models/followup.js")
// const Instructor = require("../models/instructor.js")
const followUpHelper = {
    validateId: async (id) => {
        let existsId = await Followup.findById(id)
        if (!existsId) {
            throw new Error("El seguimiento no existe en la base de datos")
        }
    },

    // validateAssignment: async (idAssignment) => {
    //     let existAssignment = await Assignment.findById(idAssignment)
    //     if (!existAssignment) {
    //         throw new Error("El id de asignación no existe ")
    //     } return existAssignment
    // },

    validateInstrustor: async (idinstructor) => {
        let existInstructor = await axios.get(`http://89.116.49.65:4500/api/instructors/${idinstructor}`, {
            headers: {
                "token": process.env.TOKEN
            }
        });
        if (!existInstructor) {
            throw new Error("El instructor no existe")
        }
    },
    validateStatus: (status) => {
        const Status = [1, 2, 3, 4];
        if (!Status.includes(status)) {
            throw new Error("El estado debe ser 1, 2,3,4");
        }
        return true;
    }
}

module.exports = followUpHelper;