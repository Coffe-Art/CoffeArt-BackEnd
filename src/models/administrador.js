// src/models/administrador.js
const db = require('../utils/db');

const Administrador = {
    create: (nombre, contrasena, correo_electronico, telefono, callback) => {
        const query = 'INSERT INTO administrador (nombre, contrasena, correo_electronico, telefono) VALUES (?, ?, ?, ?)';
        db.query(query, [nombre, contrasena, correo_electronico, telefono], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM administrador WHERE correo_electronico = ?';
        db.query(query, [email], callback);
    },
    update: (email, updates, callback) => {
        const query = 'UPDATE administrador SET nombre = ?, contrasena = ?, telefono = ? WHERE correo_electronico = ?';
        db.query(query, [updates.nombre, updates.contrasena, updates.telefono, email], callback);
    }
};

module.exports = Administrador;
