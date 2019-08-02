PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var Pago = require("../models/pago");

// ==========================================================
// Obtener todas las pagos
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Pago.find({}, "nombre ")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, pagos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las pagos",
          errors: err
        });
      }

      Pago.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          pagos: pagos,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener Pago por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  Pago.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, pago) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar pago",
          errors: err
        });
      }
      if (!pago) {
        return res.status(400).json({
          ok: false,
          mensaje: "La pago con el id " + id + "no existe",
          errors: { message: "No existe un pago con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        pago: pago
      });
    });
});

// ==========================================================
// Actualizar Pago
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Pago.findById(id, (err, pago) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un pago",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!pago) {
      return res.status(400).json({
        ok: false,
        mensaje: "El pago con el id " + id + " no existe",
        errors: { message: "No existe un pago con ese ID" }
      });
    }

    var body = req.body;

    pago.nombre = body.nombre;
    pago.usuario = req.usuario._id;
    pago.clave = body.clave;

    // Actualizamos la pago
    pago.save((err, pagoGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar el pago",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        pago: pagoGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva pago
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var pago = new Pago({
    nombre: body.nombre,
    usuario: req.usuario._id,
    clave : body.clave
  });

  pago.save((err, pagoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la pago",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      pago: pagoGuardado
    });
  });
});

// ==========================================================
// Eliminar una pago por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Pago.findByIdAndDelete(id, (err, pagoBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar pago",
        errors: err
      });
    }

    if (!pagoBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la pago con ese id para ser borrada",
        errors: { message: "Pago no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      pago: pagoBorrado
    });
  });
});

module.exports = app;
