const express = require('express');

const app = express(); 

app.use(require('./usuarioRoute'));

module.exports = app; 