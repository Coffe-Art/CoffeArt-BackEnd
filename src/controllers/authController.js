// src/controllers/authController.js
const authService = require('../services/authService');
const Administrador = require('../models/administrador');
const Empleado = require('../models/empleado');
const Comprador = require('../models/comprador');

const register = async (req, res) => {
    try {
        const { tipoUsuario, nombre, contrasena, correo_electronico, telefono, codigopostal, idempleado } = req.body;

        // Determinar qué modelo usar según el tipo de usuario
        let usuarioModel;
        if (tipoUsuario === 'administrador') {
            usuarioModel = Administrador;
        } else if (tipoUsuario === 'empleado') {
            usuarioModel = Empleado;
        } else if (tipoUsuario === 'comprador') {
            usuarioModel = Comprador;
        } else {
            return res.status(400).send('Tipo de usuario no válido');
        }

        // Llamar al servicio de autenticación para registrar al usuario
        await authService.register(usuarioModel, nombre, contrasena, correo_electronico, telefono, codigopostal, idempleado);
        res.status(201).send('Usuario registrado con éxito');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        const { tipoUsuario, correo_electronico, contrasena } = req.body; // Incluir tipoUsuario aquí

        // Llamar al servicio de autenticación para iniciar sesión
        const token = await authService.login(tipoUsuario, correo_electronico, contrasena); // Pasar tipoUsuario como primer parámetro
        res.json({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { register, login };
