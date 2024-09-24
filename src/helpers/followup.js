const Assignment = require("../models/assignment.js")
const Followup = require("../models/followup.js")
// const Instructor = require("../models/instructor.js")
const followUpHelper = {
    validateId:async(id) => {
        let existsId = await Followup.findById(id)
        if(!existsId){
            throw new Error("El seguimiento no existe en la base de datos")
        }
    },

    validateAssignment: async(idassignment) =>{
        let existAssignment = await Assignment.findById(idassignment)
        if(!existAssignment){
            throw new Error("El id de asignación no existe ")
        }
    },
    
    // validateInstrustor: async(idinstructor) => {
    //     let existInstructor = await Instructor.findById(idinstructor)
    //     if(!existInstructor){
    //         throw new Error ("El id de instructor no existe")
    //     }
    // },
}
module.exports = followUpHelper;