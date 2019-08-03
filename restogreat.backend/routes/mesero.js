PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var Mesero = require("../models/mesero");

// ==========================================================
// Obtener todas las meseros
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Mesero.find({}, "")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, meseros) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando los meseros",
          errors: err
        });
      }

      Mesero.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          meseros: meseros,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener Mesero por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  Mesero.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, mesero) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar el mesero",
          errors: err
        });
      }
      if (!mesero) {
        return res.status(400).json({
          ok: false,
          mensaje: "El mesero con el id " + id + "no existe",
          errors: { message: "No existe un mesero con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        mesero: mesero
      });
    });
});

// ==========================================================
// Actualizar Mesero
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Mesero.findById(id, (err, mesero) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un mesero",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!mesero) {
      return res.status(400).json({
        ok: false,
        mensaje: "El mesero con el id " + id + " no existe",
        errors: { message: "No existe un mesero con ese ID" }
      });
    }

    var body = req.body;

    mesero.numero = body.numero;
    mesero.nombre = body.nombre;
    mesero.apaterno = body.apaterno;
    mesero.amaterno = body.amaterno;
    mesero.nombrecorto = body.nombrecorto;
    mesero.nivel = body.nivel;

    mesero.img = body.img;
    
    mesero.usuario = req.usuario._id;
    mesero.fechaActualizacion = new Date()

    // Actualizamos la mesero
    mesero.save((err, meseroGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar el mesero",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        mesero: meseroGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva mesero
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var mesero = new Mesero({
    numero : body.numero,
    nombre: body.nombre,
    apaterno : body.apaterno,
    amaterno : body.amaterno,
    nombrecorto : body.nombrecorto,
    nivel: body.nivel,

    // password: body.password,
    // img : body.img,
    usuario: req.usuario._id,
    fechaAlta : new Date(),
    fechaActualizacion : new Date()
  });

  mesero.save((err, meseroGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando el mesero",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      mesero: meseroGuardado
    });
  });
});

// ==========================================================
// Eliminar una mesero por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Mesero.findByIdAndDelete(id, (err, meseroBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar el mesero",
        errors: err
      });
    }

    if (!meseroBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe el mesero con ese id para ser borrado",
        errors: { message: "Mesero no encontrado con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      mesero: meseroBorrado
    });
  });
});

module.exports = app;
