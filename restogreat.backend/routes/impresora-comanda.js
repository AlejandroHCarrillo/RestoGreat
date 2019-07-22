PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var ImpresoraComanda = require("../models/impresora-comanda");

// ==========================================================
// Obtener todas las impresorascomandas
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  ImpresoraComanda.find({}, "nombre ")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, impresorascomandas) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las impresorascomandas",
          errors: err
        });
      }

      ImpresoraComanda.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          impresorascomandas: impresorascomandas,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener ImpresoraComanda por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  ImpresoraComanda.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, impresoracomanda) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar impresoracomanda",
          errors: err
        });
      }
      if (!impresoracomanda) {
        return res.status(400).json({
          ok: false,
          mensaje: "La impresoracomanda con el id " + id + "no existe",
          errors: { message: "No existe un impresoracomanda con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        impresoracomanda: impresoracomanda
      });
    });
});

// ==========================================================
// Actualizar ImpresoraComanda
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  ImpresoraComanda.findById(id, (err, impresoracomanda) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un impresoracomanda",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!impresoracomanda) {
      return res.status(400).json({
        ok: false,
        mensaje: "El impresoracomanda con el id " + id + " no existe",
        errors: { message: "No existe un impresoracomanda con ese ID" }
      });
    }

    var body = req.body;

    impresoracomanda.nombre = body.nombre;
    impresoracomanda.usuario = req.usuario._id;
    impresoracomanda. = body.;

    // Actualizamos la impresoracomanda
    impresoracomanda.save((err, impresoracomandaGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el impresoracomanda",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        impresoracomanda: impresoracomandaGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva impresoracomanda
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var impresoracomanda = new ImpresoraComanda({
    nombre: body.nombre,
    usuario: req.usuario._id,
    : body.
  });

  impresoracomanda.save((err, impresoracomandaGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la impresoracomanda",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      impresoracomanda: impresoracomandaGuardado
    });
  });
});

// ==========================================================
// Eliminar una impresoracomanda por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  ImpresoraComanda.findByIdAndDelete(id, (err, impresoracomandaBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar impresoracomanda",
        errors: err
      });
    }

    if (!impresoracomandaBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la impresoracomanda con ese id para ser borrada",
        errors: { message: "ImpresoraComanda no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      impresoracomanda: impresoracomandaBorrado
    });
  });
});

module.exports = app;
