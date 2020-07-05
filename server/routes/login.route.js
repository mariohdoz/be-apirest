"use strict";

const express = require('express');

const login_controller = require('../controllers/login.controller');

const app = express();

app.post('/login', login_controller.login_normal);

module.exports = app;