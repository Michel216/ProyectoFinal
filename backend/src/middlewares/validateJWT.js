const jwt = require('jsonwebtoken');
// const Instructor = require('../models/instructor.js')

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            //100 years
            expiresIn: "100y"

        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

const validateJWT = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({
            msg: "Error en la petición"
        })
    }
    try {
        let instructor;

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        if (!uid) {
            return res.status(401).json({
                msg: "Error en la petición"
            })
        }

        instructor = await Instructor.findById(uid);


        if (!instructor) {
            return res.status(401).json({
                msg: "Error en la petición! ."//- instructor no existe DB
            })
        }

        if (instructor.estado == 0) {
            return res.status(401).json({
                msg: "Token no válido!!  " //- instructor con estado: false
            })
        }

        next();

    } catch (error) {
        
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}


module.exports = { generateJWT, validateJWT }