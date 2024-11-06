const Alumno = require('../models/Alumno');
let alumnos = []; 

// Obtener todos los alumnos
exports.getAlumnos = (req, res) => {
    res.status(200).json(alumnos);
};

// Obtener alumno por ID
exports.getAlumnoById = (req, res) => {
    const alumno = alumnos.find(al => al.id == req.params.id);
    if (alumno) res.status(200).json(alumno);
    else res.status(404).json({ error: "Alumno no encontrado" });
};

// Crear un nuevo alumno
exports.createAlumno = (req, res) => {
    const nuevoAlumno = req.body;
    if (!validarAlumno(nuevoAlumno)) {
        return res.status(400).json({ error: "Datos de alumno inválidos" });
    }
    const alumno = new Alumno(nuevoAlumno.id, nuevoAlumno.nombres, nuevoAlumno.apellidos, nuevoAlumno.matricula, nuevoAlumno.promedio);
    alumnos.push(alumno);
    res.status(201).json(alumno);
};

// Actualizar un alumno existente
exports.updateAlumno = (req, res) => {
    const alumno = alumnos.find(al => al.id == req.params.id);
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });
    
    if (!validarAlumno(req.body)) {
        return res.status(400).json({ error: "Datos de alumno inválidos" });
    }
    Object.assign(alumno, req.body);
    res.status(200).json(alumno);
};

// Eliminar un alumno
exports.deleteAlumno = (req, res) => {
    const index = alumnos.findIndex(al => al.id == req.params.id);
    if (index !== -1) {
        alumnos.splice(index, 1);
        res.status(200).json({ message: "Alumno eliminado" });
    } else res.status(404).json({ error: "Alumno no encontrado" });
};

// Manejar métodos no soportados en cualquier ruta de alumno
exports.handleUnsupportedMethods = (req, res) => {
    res.status(405).json({ error: "Método no permitido en esta ruta" });
};

// Validar datos del alumno
function validarAlumno(alumno) {
    if (
        !alumno.id || typeof alumno.id !== 'number' ||
        !alumno.nombres || typeof alumno.nombres !== 'string' ||
        !alumno.apellidos || typeof alumno.apellidos !== 'string' ||
        !alumno.matricula || typeof alumno.matricula !== 'string' ||
        typeof alumno.promedio !== 'number'
    ) {
        return false;
    }
    return true;
}
