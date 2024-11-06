// function validateCreateLog(data) {
//     const { createdAt, updatedAt } = data;

//     if (!createdAt || !updatedAt) {
//         return {
//             valid: false,
//             message: 'Los campos createdAt y updatedAt son obligatorios.'
//         };
//     }

//     return { valid: true };
// }

// function validateUpdateLog(data) {
//     const { updatedAt } = data;

//     if (!updatedAt) {
//         return {
//             valid: false,
//             message: 'El campo updatedAt es obligatorio al actualizar.'
//         };
//     }

//     return { valid: true };
// }

// module.exports = {
//     validateCreateLog,
//     validateUpdateLog

// };