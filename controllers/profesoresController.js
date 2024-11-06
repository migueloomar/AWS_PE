const Profesor = require('../models/Profesor');
let profesores = []; 

// Obtener todos los profesores
exports.getProfesores = (req, res) => {
    res.status(200).json(profesores);
};

// Obtener un profesor por ID
exports.getProfesorById = (req, res) => {
    const profesor = profesores.find(prof => prof.id == req.params.id);
    if (profesor) res.status(200).json(profesor);
    else res.status(404).json({ error: "Profesor no encontrado" });
};

// Crear un nuevo profesor
exports.createProfesor = (req, res) => {
    const nuevoProfesor = req.body;
    if (!validarProfesor(nuevoProfesor)) {
        return res.status(400).json({ error: "Datos de profesor inválidos" });
    }
    const profesor = new Profesor(nuevoProfesor.id, nuevoProfesor.numeroEmpleado, nuevoProfesor.nombres, nuevoProfesor.apellidos, nuevoProfesor.horasClase);
    profesores.push(profesor);
    res.status(201).json(profesor);
};

// Actualizar un profesor existente
exports.updateProfesor = (req, res) => {
    const profesor = profesores.find(prof => prof.id == req.params.id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
    
    if (!validarProfesor(req.body)) {
        return res.status(400).json({ error: "Datos de profesor inválidos" });
    }
    Object.assign(profesor, req.body);
    res.status(200).json(profesor);
};

// Eliminar un profesor
exports.deleteProfesor = (req, res) => {
    const index = profesores.findIndex(prof => prof.id == req.params.id);
    if (index !== -1) {
        profesores.splice(index, 1);
        res.status(200).json({ message: "Profesor eliminado" });
    } else res.status(404).json({ error: "Profesor no encontrado" });
};

// Manejar métodos no soportados en cualquier ruta de alumno
exports.handleUnsupportedMethods = (req, res) => {
    res.status(405).json({ error: "Método no permitido en esta ruta" });
};

// Validar datos del profesor
function validarProfesor(profesor) {
    if (
        !profesor.id || typeof profesor.id !== 'number' ||
        !profesor.numeroEmpleado || typeof profesor.numeroEmpleado !== 'number' ||
        !profesor.nombres || typeof profesor.nombres !== 'string' ||
        !profesor.apellidos || typeof profesor.apellidos !== 'string' ||
        typeof profesor.horasClase !== 'number'
    ) {
        return false;
    }
    return true;
}
