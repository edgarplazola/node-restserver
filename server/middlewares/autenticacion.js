const jwt = require("jsonwebtoken");

//? Verificar Token
let verificaToken = (req, res, next) => {

    let token = req.get("token"); //Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//? Verifica adminrole

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === "MASTER") {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: "El usuario no es MASTER"
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdminRole
};