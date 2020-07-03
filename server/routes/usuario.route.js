'use strict'

const express = require('express');

const usuario_controller = require('../controllers/usuario.controller');

const app = express(); 

app.post('/usuario', usuario_controller.insertar_usuario);

app.put('/usuario/:id', usuario_controller.actualizar_usuario);

app.delete('/usuario/:id', usuario_controller.eliminar_usuario);

module.exports = app; 
