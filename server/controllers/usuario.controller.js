'use stric'

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require("../models/usuario.model");

exports.insertar_usuario = (req, res) => {
  
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuario_guardado) => {

    if (err) {
        return res.status(400)
                .json({
                    status: false,
                    message: err
                });
    }

    res.status(201)
        .json({
            status: true,
            message: 'Usuario registrado correctamente',
            usuario: usuario_guardado
        });

  });


};
