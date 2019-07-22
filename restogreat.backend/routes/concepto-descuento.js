PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var ConceptoDescuento = require("../models/concepto-descuento");

// ==========================================================
// Obtener todas las ConceptosDescuento
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  ConceptoDescuento.find({}, "nombre ")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, ConceptosDescuento) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las ConceptosDescuento",
          errors: err
        });
      }

      ConceptoDescuento.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          ConceptosDescuento: ConceptosDescuento,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener ConceptoDescuento por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  ConceptoDescuento.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, conceptodescuento) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar conceptodescuento",
          errors: err
        });
      }
      if (!conceptodescuento) {
        return res.status(400).json({
          ok: false,
          mensaje: "La conceptodescuento con el id " + id + "no existe",
          errors: { message: "No existe un conceptodescuento con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        conceptodescuento: conceptodescuento
      });
    });
});

// ==========================================================
// Actualizar ConceptoDescuento
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  ConceptoDescuento.findById(id, (err, conceptodescuento) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un conceptodescuento",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!conceptodescuento) {
      return res.status(400).json({
        ok: false,
        mensaje: "El conceptodescuento con el id " + id + " no existe",
        errors: { message: "No existe un conceptodescuento con ese ID" }
      });
    }

    var body = req.body;

    conceptodescuento.nombre = body.nombre;
    conceptodescuento.usuario = req.usuario._id;
    conceptodescuento. = body.;

    // Actualizamos la conceptodescuento
    conceptodescuento.save((err, conceptodescuentoGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el conceptodescuento",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        conceptodescuento: conceptodescuentoGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva conceptodescuento
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var conceptodescuento = new ConceptoDescuento({
    nombre: body.nombre,
    usuario: req.usuario._id,
    : body.
  });

  conceptodescuento.save((err, conceptodescuentoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la conceptodescuento",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      conceptodescuento: conceptodescuentoGuardado
    });
  });
});

// ==========================================================
// Eliminar una conceptodescuento por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  ConceptoDescuento.findByIdAndDelete(id, (err, conceptodescuentoBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar conceptodescuento",
        errors: err
      });
    }

    if (!conceptodescuentoBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la conceptodescuento con ese id para ser borrada",
        errors: { message: "ConceptoDescuento no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      conceptodescuento: conceptodescuentoBorrado
    });
  });
});

module.exports = app;
