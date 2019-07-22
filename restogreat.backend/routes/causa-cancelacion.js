PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var CausaCancelacion = require("../models/causa-cancelacion");

// ==========================================================
// Obtener todas las causacancelaciones
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  CausaCancelacion.find({}, "nombre ")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, causacancelaciones) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las causacancelaciones",
          errors: err
        });
      }

      CausaCancelacion.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          causacancelaciones: causacancelaciones,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener CausaCancelacion por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  CausaCancelacion.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, causacancelacion) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar causacancelacion",
          errors: err
        });
      }
      if (!causacancelacion) {
        return res.status(400).json({
          ok: false,
          mensaje: "La causacancelacion con el id " + id + "no existe",
          errors: { message: "No existe un causacancelacion con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        causacancelacion: causacancelacion
      });
    });
});

// ==========================================================
// Actualizar CausaCancelacion
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  CausaCancelacion.findById(id, (err, causacancelacion) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un causacancelacion",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!causacancelacion) {
      return res.status(400).json({
        ok: false,
        mensaje: "El causacancelacion con el id " + id + " no existe",
        errors: { message: "No existe un causacancelacion con ese ID" }
      });
    }

    var body = req.body;

    causacancelacion.nombre = body.nombre;
    causacancelacion.usuario = req.usuario._id;
    causacancelacion. = body.;

    // Actualizamos la causacancelacion
    causacancelacion.save((err, causacancelacionGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el causacancelacion",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        causacancelacion: causacancelacionGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva causacancelacion
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var causacancelacion = new CausaCancelacion({
    nombre: body.nombre,
    usuario: req.usuario._id,
    : body.
  });

  causacancelacion.save((err, causacancelacionGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la causacancelacion",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      causacancelacion: causacancelacionGuardado
    });
  });
});

// ==========================================================
// Eliminar una causacancelacion por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  CausaCancelacion.findByIdAndDelete(id, (err, causacancelacionBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar causacancelacion",
        errors: err
      });
    }

    if (!causacancelacionBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la causacancelacion con ese id para ser borrada",
        errors: { message: "CausaCancelacion no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      causacancelacion: causacancelacionBorrado
    });
  });
});

module.exports = app;
