PAGESIZE = require("../config/config").PAGESIZE;
var express = require("express");

var mdAutentificacion = require("../middlewares/autenticacion");

var app = express();
var Cliente = require("../models/cliente");

// ==========================================================
// Obtener todas las clientes
// ==========================================================
app.get("/", (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Cliente.find({}, "nombre ")
    .populate("usuario", "nombre email")
    .skip(desde)
    .limit(PAGESIZE)
    .exec((err, clientes) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando las clientes",
          errors: err
        });
      }

      Cliente.countDocuments({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          clientes: clientes,
          total: conteo
        });
      });
    });
});

// ==========================================
// Obtener Cliente por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  Cliente.findById(id)
    .populate("usuario", "nombre img email")
    .exec((err, cliente) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar cliente",
          errors: err
        });
      }
      if (!cliente) {
        return res.status(400).json({
          ok: false,
          mensaje: "La cliente con el id " + id + "no existe",
          errors: { message: "No existe un cliente con ese ID" }
        });
      }
      res.status(200).json({
        ok: true,
        cliente: cliente
      });
    });
});

// ==========================================================
// Actualizar Cliente
// ==========================================================
app.put("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Cliente.findById(id, (err, cliente) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar un cliente",
        errors: err
      });
    }
    // validar si no hay datos para actualizar
    if (!cliente) {
      return res.status(400).json({
        ok: false,
        mensaje: "El cliente con el id " + id + " no existe",
        errors: { message: "No existe un cliente con ese ID" }
      });
    }

    var body = req.body;

    cliente.nombre = body.nombre;
    cliente.usuario = req.usuario._id;
    cliente.clave = body.clave;

    // Actualizamos la cliente
    cliente.save((err, clienteGuardado) => {
      // Manejo de errores
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error la actualizar el cliente",
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        cliente: clienteGuardado
      });
    });
  });
});

// ==========================================================
// Crear una nueva cliente
// ==========================================================
app.post("/", mdAutentificacion.verificaToken, (req, res) => {
  var body = req.body;

  var cliente = new Cliente({
    nombre: body.nombre,
    usuario: req.usuario._id,
    clave : body.clave
  });

  cliente.save((err, clienteGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error guardando la cliente",
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      cliente: clienteGuardado
    });
  });
});

// ==========================================================
// Eliminar una cliente por el Id
// ==========================================================
app.delete("/:id", mdAutentificacion.verificaToken, (req, res) => {
  var id = req.params.id;

  Cliente.findByIdAndDelete(id, (err, clienteBorrado) => {
    // validar si ocurrio un error
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar cliente",
        errors: err
      });
    }

    if (!clienteBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe la cliente con ese id para ser borrada",
        errors: { message: "Cliente no encontrada con ese id" }
      });
    }

    res.status(200).json({
      ok: true,
      cliente: clienteBorrado
    });
  });
});

module.exports = app;
