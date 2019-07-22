PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var ModificadorRubro = require("../models/modificador-rubro");

// ==========================================================
// Obtener todas las modificadoresrubro
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  ModificadorRubro.find({}, "nombre ")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, modificadoresrubro) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las modificadoresrubro",
          errors: err
        });
      }

      ModificadorRubro.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          modificadoresrubro: modificadoresrubro,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener ModificadorRubro por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  ModificadorRubro.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, modificadorrubro) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar modificadorrubro",
          errors: err
        });
      }
      if (!modificadorrubro) {
        return res.status(400).json({
          ok: false,
          mensaje: "La modificadorrubro con el id " + id + "no existe",
          errors: { message: "No existe un modificadorrubro con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        modificadorrubro: modificadorrubro
      });
    });
});

// ==========================================================
// Actualizar ModificadorRubro
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  ModificadorRubro.findById(id, (err, modificadorrubro) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un modificadorrubro",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!modificadorrubro) {
      return res.status(400).json({
        ok: false,
        mensaje: "El modificadorrubro con el id " + id + " no existe",
        errors: { message: "No existe un modificadorrubro con ese ID" }
      });
    }

    var body = req.body;

    modificadorrubro.nombre = body.nombre;
    modificadorrubro.usuario = req.usuario._id;
    modificadorrubro. = body.;

    // Actualizamos la modificadorrubro
    modificadorrubro.save((err, modificadorrubroGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el modificadorrubro",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        modificadorrubro: modificadorrubroGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva modificadorrubro
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var modificadorrubro = new ModificadorRubro({
    nombre: body.nombre,
    usuario: req.usuario._id,
    : body.
  });

  modificadorrubro.save((err, modificadorrubroGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la modificadorrubro",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      modificadorrubro: modificadorrubroGuardado
    });
  });
});

// ==========================================================
// Eliminar una modificadorrubro por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  ModificadorRubro.findByIdAndDelete(id, (err, modificadorrubroBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar modificadorrubro",
        errors: err
      });
    }

    if (!modificadorrubroBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la modificadorrubro con ese id para ser borrada",
        errors: { message: "ModificadorRubro no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      modificadorrubro: modificadorrubroBorrado
    });
  });
});

module.exports = app;
