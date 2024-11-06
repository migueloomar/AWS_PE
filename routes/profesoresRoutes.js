const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/', profesoresController.getProfesores);
router.get('/:id', profesoresController.getProfesorById);
router.post('/', profesoresController.createProfesor);
router.put('/:id', profesoresController.updateProfesor);
router.delete('/:id', profesoresController.deleteProfesor);

// Manejar métodos no soportados
router.all('/', profesoresController.handleUnsupportedMethods);
router.all('/:id', profesoresController.handleUnsupportedMethods);


module.exports = router;
