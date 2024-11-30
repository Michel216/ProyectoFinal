const axios = require("axios")


async function validateRepforaJWT(req, res, next) {
    const token = req.header("token");
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



module.exports = { validateRepforaJWT }