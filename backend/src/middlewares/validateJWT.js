const jwt = require('jsonwebtoken');
const Apprentice = require('../models/apprentice.js')
const axios = require("axios")

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "1h"
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

async function validateRepforaJWT(req, res, next, token) {
    if (!token) {
        return res.status(401).json({
            msg: "Error en la petición"
        })
    }
    try {
        const response = await axios.post(
            "http://89.116.49.65:4500/api/instructors/token/productive/stages",
            {},
            { headers: { token } }
        );
        next();
    } catch (error) {
        validateADMINJWT(req, res, next, token)
    }
}

async function validateADMINJWT(req, res, next, token) {
    if (!token) {
        return res.status(401).json({
            msg: "Error en la petición"
        })
    }
    try {
        const response = await axios.post(
            "http://89.116.49.65:4500/api/users/token/productive/stages",
            {},
            { headers: { token } }
        );
        next();
    } catch (error) {
        res.status(401).json({
            msg: "Error en la petición"
        })
    }
}

const validateApprenticeJWT = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({
            msg: "Error en la petición 1"
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        let apprentice = await Apprentice.findById(uid);

        if (!apprentice) {
            return res.status(401).json({
                msg: "Error en la petición"//- instructor no existe DB
            })
        }

        if (apprentice.status == 0) {
            return res.status(401).json({
                msg: "Error en la petición" //- instructor con estado: false
            })
        }

        next();
    } catch (error) {
        validateRepforaJWT(req, res, next, token)
    }
}

module.exports = { generateJWT, validateApprenticeJWT }