const express = require('express');
const router = express.Router();
const ValidadorCedula = require('../validator');

router.post('/cedula', (req, res) => {
  try {
    const { cedula } = req.body;
    
    if (!cedula) {
      return res.status(400).json({
        error: 'El campo cedula es requerido'
      });
    }
    
    const resultado = ValidadorCedula.validarCedula(cedula);
    const informacion = ValidadorCedula.extraerInformacion(cedula);
    
    res.json({
      ...resultado,
      informacion: informacion
    });
    
  } catch (error) {
    res.status(500).json({
      error: 'Error en el servidor',
      detalle: error.message
    });
  }
});

router.get('/cedula/:cedula', (req, res) => {
  try {
    const { cedula } = req.params;
    
    const resultado = ValidadorCedula.validarCedula(cedula);
    const informacion = ValidadorCedula.extraerInformacion(cedula);
    
    res.json({
      ...resultado,
      informacion: informacion
    });
    
  } catch (error) {
    res.status(500).json({
      error: 'Error en el servidor',
      detalle: error.message
    });
  }
});

router.get('/info', (req, res) => {
  res.json({
    servicio: 'Validación de Cédula Dominicana',
    algoritmo: 'Módulo 10',
    version: '1.0.0',
    uso: {
      post: {
        endpoint: '/api/validacion/cedula',
        metodo: 'POST',
        body: {
          cedula: '00112345678'
        }
      },
      get: {
        endpoint: '/api/validacion/cedula/:cedula',
        metodo: 'GET',
        ejemplo: '/api/validacion/cedula/00112345678'
      }
    }
  });
});

module.exports = router;

