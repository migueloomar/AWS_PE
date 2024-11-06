const express = require('express');
const app = express();
const alumnosRoutes = require('./routes/alumnosRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');

app.use(express.json()); 

// Rutas
app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);

// Escuchar en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
