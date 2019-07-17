PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var Seccion = require("../models/cuenta");

// ==========================================================
// Obtener todas las cuentas
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Seccion.find({}, "nombre abreviacion")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, cuentas) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las cuentas",
          errors: err
        });
      }

      Seccion.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          cuentas: cuentas,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener Seccion por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  Seccion.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, cuenta) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar cuenta",
          errors: err
        });
      }
      if (!cuenta) {
        return res.status(400).json({
          ok: false,
          mensaje: "La cuenta con el id " + id + "no existe",
          errors: { message: "No existe un cuenta con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        cuenta: cuenta
      });
    });
});

// ==========================================================
// Actualizar Seccion
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Seccion.findById(id, (err, cuenta) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un cuenta",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!cuenta) {
      return res.status(400).json({
        ok: false,
        mensaje: "El cuenta con el id " + id + " no existe",
        errors: { message: "No existe un cuenta con ese ID" }
      });
    }

    var body = req.body;

    cuenta.nombre = body.nombre;
    cuenta.usuario = req.usuario._id;
    cuenta.abreviacion = body.abreviacion;

    // Actualizamos la cuenta
    cuenta.save((err, cuentaGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el cuenta",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        cuenta: cuentaGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva cuenta
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var cuenta = new Seccion({
    nombre: body.nombre,
    usuario: req.usuario._id,
    abreviacion: body.abreviacion
  });

  cuenta.save((err, cuentaGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la cuenta",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      cuenta: cuentaGuardado
    });
  });
});

// ==========================================================
// Eliminar una cuenta por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Seccion.findByIdAndDelete(id, (err, cuentaBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar cuenta",
        errors: err
      });
    }

    if (!cuentaBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la cuenta con ese id para ser borrada",
        errors: { message: "Seccion no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      cuenta: cuentaBorrado
    });
  });
});

module.exports = app;
