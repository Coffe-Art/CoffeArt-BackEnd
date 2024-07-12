// src/models/comprador.js
const db = require('../utils/db');

const Comprador = {
    create: (nombre, contrasena, correo_electronico, telefono, codigopostal, idempleado, callback) => {
        const query = 'INSERT INTO comprador (nombre, contrasena, correo_electronico, telefono, codigopostal, idempleado) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [nombre, contrasena, correo_electronico, telefono, codigopostal, idempleado], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM comprador WHERE correo_electronico = ?';
        db.query(query, [email], callback);
    },
    update: (email, updates, callback) => {
        const query = 'UPDATE comprador SET nombre = ?, contrasena = ?, telefono = ?, codigopostal = ?, idempleado = ? WHERE correo_electronico = ?';
        db.query(query, [updates.nombre, updates.contrasena, updates.telefono, updates.codigopostal, updates.idempleado, email], callback);
    }
};

module.exports = Comprador;
