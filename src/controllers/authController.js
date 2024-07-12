// src/controllers/authController.js
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { nombre, contrasena, correo_electronico, telefono } = req.body;
        await authService.register(nombre, contrasena, correo_electronico, telefono);
        res.status(201).send('Usuario registrado con éxito');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        const { correo_electronico, contrasena } = req.body;
        const token = await authService.login(correo_electronico, contrasena);
        res.json({ token });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { register, login };
