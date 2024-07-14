const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        console.log("Register endpoint hit");
        const { tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal } = req.body;

        if (['administrador', 'empleado', 'comprador'].includes(tipoUsuario)) {
            await authService.register(tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal);
            res.status(201).send('Usuario registrado con éxito');
        } else {
            return res.status(400).send('Tipo de usuario no válido');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        console.log("Login endpoint hit");
        const { tipoUsuario, correo_electronico, contrasena } = req.body;

        const token = await authService.login(tipoUsuario, correo_electronico, contrasena);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
};

module.exports = { register, login };
