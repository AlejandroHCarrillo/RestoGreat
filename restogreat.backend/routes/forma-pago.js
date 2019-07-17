PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var FormPago = require("../models/forma-pago");

// ==========================================================
// Obtener todas las FormasPago
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  FormPago.find({}, "nombre abreviacion")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, FormasPago) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las FormasPago",
          errors: err
        });
      }

      FormPago.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          FormasPago: FormasPago,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener FormPago por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  FormPago.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, formaPago) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar formaPago",
          errors: err
        });
      }
      if (!formaPago) {
        return res.status(400).json({
          ok: false,
          mensaje: "La formaPago con el id " + id + "no existe",
          errors: { message: "No existe un formaPago con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        formaPago: formaPago
      });
    });
});

// ==========================================================
// Actualizar FormPago
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  FormPago.findById(id, (err, formaPago) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un formaPago",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!formaPago) {
      return res.status(400).json({
        ok: false,
        mensaje: "El formaPago con el id " + id + " no existe",
        errors: { message: "No existe un formaPago con ese ID" }
      });
    }

    var body = req.body;

    formaPago.nombre = body.nombre;
    formaPago.usuario = req.usuario._id;
    formaPago.abreviacion = body.abreviacion;

    // Actualizamos la formaPago
    formaPago.save((err, formaPagoGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el formaPago",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        formaPago: formaPagoGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva formaPago
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var formaPago = new FormPago({
    nombre: body.nombre,
    usuario: req.usuario._id,
    abreviacion: body.abreviacion
  });

  formaPago.save((err, formaPagoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la formaPago",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      formaPago: formaPagoGuardado
    });
  });
});

// ==========================================================
// Eliminar una formaPago por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  FormPago.findByIdAndDelete(id, (err, formaPagoBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar formaPago",
        errors: err
      });
    }

    if (!formaPagoBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la formaPago con ese id para ser borrada",
        errors: { message: "FormPago no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      formaPago: formaPagoBorrado
    });
  });
});

module.exports = app;
