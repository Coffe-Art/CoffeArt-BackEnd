// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrador = require('../models/administrador');
const Empleado = require('../models/empleado');
const Comprador = require('../models/comprador');

const register = async (usuarioModel, nombre, contrasena, correo_electronico, telefono, codigopostal, idempleado) => {
    try {
        // Generar hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear usuario utilizando el modelo correspondiente
        await usuarioModel.create(nombre, hashedPassword, correo_electronico, telefono, codigopostal, idempleado, (err, result) => {
            if (err) throw err;
        });
    } catch (err) {
        throw err;
    }
};

const login = async (tipoUsuario, correo_electronico, contrasena) => {
    try {
        let usuarioModel;

        // Determinar qué modelo usar según el tipo de usuario
        if (tipoUsuario === 'administrador') {
            usuarioModel = Administrador;
        } else if (tipoUsuario === 'empleado') {
            usuarioModel = Empleado;
        } else if (tipoUsuario === 'comprador') {
            usuarioModel = Comprador;
        } else {
            throw new Error('Tipo de usuario no válido');
        }

        // Buscar usuario por correo electrónico
        const results = await new Promise((resolve, reject) => {
            usuarioModel.findByEmail(correo_electronico, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (results.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar la contraseña
        const match = await bcrypt.compare(contrasena, results[0].contrasena);
        if (!match) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar token JWT
        const JWT_SECRET = 'qwerty12';
        const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (err) {
        throw err;
    }
};

module.exports = { register, login };
