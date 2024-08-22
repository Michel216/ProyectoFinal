// login
const UserEp = require('../models/userEp.js')
const { generarJWT } = require('../middlewares/validarJWT');
const { comparePassword } = require('../helpers/userEp.js');


const userEpController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await UserEp.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'email o contraseña incorrectos' });
            }

            const validPassword = comparePassword(password, UserEp.password);
            if (!validPassword) {
                return res.status(400).json({ msg: 'email o contraseña incorrectos' });
            }

            const token = await generarJWT(UserEp.id);
            res.json({ user, token });

        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ msg: 'Error en el login' });
        }
    }
}
module.exports = userEpController;