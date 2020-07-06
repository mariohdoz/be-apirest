'use strict'

const express = require('express');
const usuario_controller = require('../controllers/usuario.controller');
const { verificar_token } = require("../middlewares/auth.middleware");

const app = express(); 

app.post('/usuario', usuario_controller.insertar_usuario);

app.put('/usuario/:id', [verificar_token], usuario_controller.actualizar_usuario);

app.delete('/usuario/:id', [verificar_token], usuario_controller.eliminar_usuario);

module.exports = app; 
