const db = require('../utils/db'); // Asegúrate de tener configurado el archivo de conexión a la base de datos

const Empresa = {
    create: (nombre, direccion, idadministrador, callback) => {
        const query = 'CALL CreateEmpresa(?, ?, ?)';
        db.query(query, [nombre, direccion, idadministrador], callback);
    },
    findById: (codigoempresa, callback) => {
        const query = 'CALL ReadEmpresa(?)';
        db.query(query, [codigoempresa], callback);
    },
    update: (codigoempresa, nombre, direccion, idadministrador, callback) => {
        const query = 'CALL UpdateEmpresa(?, ?, ?, ?)';
        db.query(query, [codigoempresa, nombre, direccion, idadministrador], callback);
    },
    delete: (codigoempresa, callback) => {
        const query = 'CALL DeleteEmpresa(?)';
        db.query(query, [codigoempresa], callback);
    },

    linkEmpleadoToEmpresa: (codigoempresa, idempleado, callback) => {
        const query = 'CALL LinkEmpleadoToEmpresa(?, ?)';
        db.query(query, [codigoempresa, idempleado], callback);
    },

    unlinkEmpleadoFromEmpresa: (codigoempresa, idempleado, callback) => {
        const query = 'CALL UnlinkEmpleadoFromEmpresa(?, ?)';
        db.query(query, [codigoempresa, idempleado], callback);
    }
};

module.exports = Empresa;
