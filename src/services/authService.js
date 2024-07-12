// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrador = require('../models/administrador');

const register = async (nombre, contrasena, correo_electronico, telefono) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    return new Promise((resolve, reject) => {
        Administrador.create(nombre, hashedPassword, correo_electronico, telefono, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const login = async (correo_electronico, contrasena) => {
    return new Promise((resolve, reject) => {
        Administrador.findByEmail(correo_electronico, async (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject('Usuario no encontrado');

            const admin = results[0];
            const match = await bcrypt.compare(contrasena, admin.contrasena);
            if (!match) return reject('Contraseña incorrecta');

            const JWT_SECRET = 'qwerty12';
            const token = jwt.sign({ id: admin.idadministrador }, JWT_SECRET, { expiresIn: '1h' });
            resolve(token);
        });
    });
};

module.exports = { register, login };
