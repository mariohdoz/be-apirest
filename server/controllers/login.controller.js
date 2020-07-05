"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require('../models/usuario.model');

exports.login_normal = (req, res) => {

    let body = req.body;

    Usuario.findOne({email: body.email, estado: true}, {}, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                mensaje: err,
            });
        }

        if (!usuarioDB){
            return res.status(400).json({
                status: false,
                mensaje: "Usuario o contraseña incorrecto",
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                status: false,
                mensaje: "Usuario o contraseña incorrecto.",
            });
        }

        let token = generarToken(usuarioDB);

        return res.status(200).json({
            status: true,
            mensaje: "Inicio de sesión correcta",
            usuario: usuarioDB,
            token,
        });

    });

}

function generarToken(usuario) {
    return jwt.sign({ usuario }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });
};

