const UserEp = require('../models/userEp');
const { generarJWT } = require('../middlewares/validarJWT');
const { comparePassword } = require('../helpers/userEp');

const userEpController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Buscar el usuario por correo electrónico
            const user = await UserEp.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Email o contraseña incorrectos' });
            }

            // Comparar la contraseña proporcionada con la contraseña almacenada
            const validPassword = comparePassword(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ msg: 'Email o contraseña incorrectos' });
            }

            // Generar un token usando el ID del usuario
            const token = await generarJWT(user._id);
            res.json({ user, token });

        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ msg: 'Error en el login' });
        }
    }
};

module.exports = userEpController;
