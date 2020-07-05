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
			return res.status(400).json({
										status: false,
										message: err
									});
		}

		res.status(201)
			.json({
				status: true,
				message: 'Usuario registrado correctamente',
				usuario: usuario_guardado,
				id: usuario_guardado._id
			});

    });
};

exports.actualizar_usuario = (req, res) => {

	const id = req.params.id;
	const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

	Usuario.findOneAndUpdate({ _id: id }, body, { runValidators: true, context: 'query', new: true }, (err, usuarioDB)=>{
		if (err) {
			return res.status(400).json({
				status: false,
				mensaje: err
			});
		}

		if (!usuarioDB) {
			return res.status(400).json({
				status: false,
				mensaje: 'Usuario no registrado'
			});
		}

		return res.status(200).json({
			status: true,
			mensaje: 'Usuario actualizado',
			usuario: usuarioDB
		});

	});

};

exports.eliminar_usuario = (req, res) => {
  	let id = req.params.id;

  	Usuario.findOneAndUpdate( {_id: id, estado: true}, { estado: false }, { runValidators: true, context: 'query', new: true }, (err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				status: false,
				mensaje: err
			});
		}

    	if (!usuarioDB) {
      		return res.status(400).json({
        		status: false,
        		mensaje: 'Usuario no registrado'
      		});
    	}
    
    	return res.status(200).json({
        	status: true,
			mensaje: 'Usuario eliminado',
			usuario: usuarioDB
    	});

  	});
};