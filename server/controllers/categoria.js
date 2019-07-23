const express = require("express");

let { verificaToken } = require("../middlewares/autenticacion");
let { verificaAdminRole } = require("../middlewares/autenticacion");
let app = express();

let Categoria = require("../models/categoria");

//?Mostrar todas las categorías
app.get("/categoria", verificaToken, (req, res) => {

    Categoria.find({})
        .sort("descripcion")
        .populate("usuario", "nombre email")
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias: categorias
            });
        });

});

//?Mostrar todas las categorías
app.get("/categoria/:id", verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "El id no es correcto"
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//?Crear nueva categorías
app.post("/categoria", verificaToken, (req, res) => {
    //TODO Regresa la categoria
    //TODO req.usuario._id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//?Actualizar la categoria
app.put("/categoria/:id", verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//?Borrar Categoría
app.delete("/categoria/:id", [verificaToken, verificaAdminRole], (req, res) => {
    //TODO Solo un administrador puede borrar categorías
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "ID no existe"
                }
            });
        }

        res.json({
            ok: true,
            message: "Categoría borrada"
        });

    })
});

module.exports = app;