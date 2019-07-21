var express = require("express");

var fileUpload = require("express-fileupload");
var fs = require("fs");

var app = express();

app.use(fileUpload());

var Usuario = require("../models/usuario");
var Medico = require("../models/medico");
var Hospital = require("../models/hospital");
var Seccion = require("../models/seccion");
var Grupo = require("../models/grupo");

app.put("/:tipo/:id", (req, res) => {
  console.log('Iniciando el guardado de la imagen');
  
  var tipo = req.params.tipo;
  var id = req.params.id;
  //  Validar archvios recibidos
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: "No hay archivos seleccionados",
      errors: { message: "Debe seleccionar un archivo" }
    });
  }

  // Obtener el nombre del archivo
  var archivo = req.files.imagen;
  var nombreCortado = archivo.name.split(".");
  var extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Verifica el tipo de imagenes
  var coleccionesValidas = ["hospitales", "medicos", "usuarios", "secciones", "grupos"];
  if (coleccionesValidas.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "El tipo de coleccion de imagen no es valido",
      errors: {
        message:
          "Debe seleccionar un tipo de coleccion valida " +
          coleccionesValidas.join(", ")
      }
    });
  }

  // Verifica extensiones Validas
  var extensionesValidas = ["png", "jpg", "gif", "jpeg"];  
  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "El archivo seleccionado no tiene una extension valida",
      errors: {
        message:
          "Debe seleccionar un archivo con las extensiones " +
          extensionesValidas.join(", ")
      }
    });
  }

  // standarizamos el nombre
  // IDusuario-numeroRandom.ext
  var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
  
  //   Mover archivo a la carpeta adecuada
  var path = `./uploads/${tipo}/${nombreArchivo}`;

  archivo.mv(path, err => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error moviendo el archivo",
        errors: err
      });
    }

    subirPorTipo(tipo, id, nombreArchivo, res);

  });
});

function borrarImagenAnterior(tipo, imgAnterior){
  console.log('Eliminar imagen anterior ' + tipo);
  var pathViejo = `./uploads/${tipo}/${imgAnterior}`;
  if (fs.existsSync(pathViejo)) {
    fs.unlink(pathViejo);
  }
}

function subirImagenUsuario(id, tipo, res){

  Usuario.findById(id, (err, usuario) => {
    if (!usuario) {
      return res.status(400).json({
          ok: false,
          mensaje: "Usuario no encontrado",
          errors: { message: "El usuario buscado no existe"}
        });
    }

    // Localizamos y borramos la imagen anterior
    borrarImagenAnterior(tipo, usuario.img);
    // var pathViejo = `./uploads/${tipo}/${usuario.img}`;
    // if (fs.existsSync(pathViejo)) {
    //   fs.unlink(pathViejo);
    // }

    usuario.img = nombreArchivo;
    usuario.save((err, usuarioActualizado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error actualizando la imagen",
          errors: err
        });
      }
      usuarioActualizado.password = ":S";

      return res.status(200).json({
        ok: true,
        mensaje: "Imagen actualizada con exito",
        usuario: usuarioActualizado
      });
    });
  });
}

function subirImagenMedico(id, tipo, res){

  Medico.findById(id, (err, medico) => {
    if (!medico) {
        return res.status(400).json({
            ok: false,
            mensaje: "Medico no encontrado",
            errors: { message: "El medico buscado no existe"}
          });
    }
    // Localizamos y borramos la imagen anterior
    borrarImagenAnterior(tipo, medico.img);
    // var pathViejo = `./uploads/${tipo}/${medico.img}`;
    // if (fs.existsSync(pathViejo)) {
    //   fs.unlink(pathViejo);
    // }

    medico.img = nombreArchivo;
    medico.save((err, medicoActualizado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error actualizando la imagen",
          errors: err
        });
      }      
      return res.status(200).json({
        ok: true,
        mensaje: "Imagen actualizada con exito",
        medico: medicoActualizado
      });
    });
  });
  
}

function subirImagenHospital(id, tipo, res){

  Hospital.findById(id, (err, hospital) => {
    if (!hospital) {
        return res.status(400).json({
            ok: false,
            mensaje: "Hospital no encontrado",
            errors: { message: "El hospital buscado no existe"}
          });
    }

    // Localizamos y borramos la imagen anterior
    borrarImagenAnterior(tipo, hospital.img);

    // var pathViejo = `./uploads/${tipo}/${hospital.img}`;    
    // if (fs.existsSync(pathViejo)) {
    //     console.log('eliminar archivo');
    //   fs.unlink(pathViejo);
    // }

    hospital.img = nombreArchivo;

    hospital.save((err, hospitalActualizado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error actualizando la imagen",
          errors: err
        });
      }      
      return res.status(200).json({
        ok: true,
        mensaje: "Imagen actualizada con exito",
        hospital: hospitalActualizado
      });
    });
  });  
}

function subirImagenSeccion(id, tipo, nombreArchivo, res){
  console.log('subir imagen ' + tipo);

  Seccion.findById(id, (err, seccion) => {
    if (!seccion) {
    console.log('Elemento no encontrado ' + tipo);
      return retErr400(res, tipo);
    }

    // Localizamos y borramos la imagen anterior
    borrarImagenAnterior(tipo, seccion.img);

    seccion.img = nombreArchivo;

    seccion.save((err, dataActualizada) => {
      if (err) {
        return retErr500(res, tipo, err);
      }      
      return retOK200(res, tipo, dataActualizada);
    });
  });  
}

function subirImagenGrupo(id, tipo, nombreArchivo, res){
  console.log('subir imagen ' + tipo);

  Grupo.findById(id, (err, grupo) => {
    if (!grupo) {
      console.log('Elemento no encontrado ' + tipo);
      return retErr400(res, tipo);
    }

    // Localizamos y borramos la imagen anterior
    borrarImagenAnterior(tipo, grupo.img);

    grupo.img = nombreArchivo;

    grupo.save((err, dataActualizada) => {
      if (err) {
        return retErr500 (res, tipo, err);
      }      
      return retOK200(res, tipo, dataActualizada); 
    });
  });  
}

function retOK200 (res, tipo, data){
  console.log(`Imagen (${tipo}) actualizada con exito.`);
  console.log(data);
  

  return res.status(200).json({
    ok: true,
    mensaje: `Imagen (${tipo}) actualizada con exito.`,
    seccion: data
  });
}

function retErr400(res, tipo){
  console.log(`Elemento (${tipo}) buscado no existe.`);

  return res.status(400).json({
    ok: false,
    mensaje: `Elemento (${tipo}) no encontrado.`,
    errors: { message: `Elemento (${tipo}) buscado no existe.`}
  });
}

function retErr500 (res, tipo, err){
  console.log(`Error actualizando la imagen (${tipo}).`);
  
  return res.status(500).json({
    ok: false,
    mensaje: `Error actualizando la imagen (${tipo}).`,
    errors: err
  });
}


function subirPorTipo(tipo, id, nombreArchivo, res) {

  if (tipo === "usuarios") {
    subirImagenUsuario(id, tipo, res);
  }

  if (tipo === "medicos") {
    subirImagenMedico(id, tipo, res);
  }

  if (tipo === "hospitales") {
    subirImagenHospital(id, tipo, res);
  }

  if (tipo === "secciones") {
    console.log('subir imagen ' + tipo);
    subirImagenSeccion(id, tipo, nombreArchivo, res);
  }

  if (tipo === "grupos") {
    console.log('subir imagen ' + tipo);
    subirImagenGrupo(id, tipo, nombreArchivo, res);
  }

}

module.exports = app;
