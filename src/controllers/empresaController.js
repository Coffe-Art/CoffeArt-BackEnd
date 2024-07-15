const Empresa = require('../models/empresa');

// Controlador para crear una empresa
exports.createEmpresa = (req, res) => {
    const { nombre, direccion, descripcion, idadministrador } = req.body;
    console.log('Datos recibidos:', nombre, direccion, descripcion, idadministrador);
    Empresa.create(nombre, direccion, descripcion, idadministrador, (err, result) => {
        if (err) {
            console.error('Error al crear empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empresa creada exitosamente', id: result.insertId });
        }
    });
};

// Controlador para obtener detalles de una empresa por su código
exports.getEmpresa = (req, res) => {
    const codigoempresa = req.params.codigoempresa;
    Empresa.findById(codigoempresa, (err, empresa) => {
        if (err) {
            console.error('Error al obtener empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (empresa && empresa.length > 0) {
                res.status(200).json(empresa[0]); // Suponiendo que el procedimiento almacenado devuelve un solo resultado
            } else {
                res.status(404).json({ error: 'Empresa no encontrada' });
            }
        }
    });
};

// Controlador para actualizar detalles de una empresa
exports.updateEmpresa = (req, res) => {
    const { codigoempresa } = req.params;
    const { nombre, direccion, descripcion, idadministrador } = req.body;
    Empresa.update(codigoempresa, nombre, direccion, descripcion, idadministrador, (err, result) => {
        if (err) {
            console.error('Error al actualizar empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empresa actualizada exitosamente' });
        }
    });
};

// Controlador para eliminar una empresa
exports.deleteEmpresa = (req, res) => {
    const codigoempresa = req.params.codigoempresa;
    Empresa.delete(codigoempresa, (err, result) => {
        if (err) {
            console.error('Error al eliminar empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empresa eliminada exitosamente' });
        }
    });
};

// Controlador para vincular un empleado a una empresa
exports.linkEmpleadoToEmpresa = (req, res) => {
    const { codigoempresa, idempleado } = req.body;
    Empresa.linkEmpleadoToEmpresa(codigoempresa, idempleado, (err, result) => {
        if (err) {
            console.error('Error al vincular empleado a empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empleado vinculado a empresa exitosamente' });
        }
    });
};

// Controlador para desvincular un empleado de una empresa
exports.unlinkEmpleadoFromEmpresa = (req, res) => {
    const { codigoempresa, idempleado } = req.body;
    Empresa.unlinkEmpleadoFromEmpresa(codigoempresa, idempleado, (err, result) => {
        if (err) {
            console.error('Error al desvincular empleado de empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empleado desvinculado de empresa exitosamente' });
        }
    });
};
