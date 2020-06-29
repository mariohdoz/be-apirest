'use strict'

const express = require('express');

const usuario_controller = require('../controllers/usuario.controller');

const app = express(); 

app.post('/usuario', usuario_controller.insertar_usuario);

module.exports = app; 
