const jwt = require('jsonwebtoken');

// ====================== //
//    Verificar Token     //
// ====================== //

let verificar_token = (req, res, next) => {
    let token = req.get("Authorization");

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: "Token no válido",
            });
        }

        req.usuario = decode.usuario;

        next();
    }); 
};

module.exports = {
    verificar_token
}
