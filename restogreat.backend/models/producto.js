var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var productoSchema =	new Schema({
        clave: { type: String, required: [true, 'La clave del producto es necesario']	},
        grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: [true, 'El grupo del producto es necesario'] },
        nombre: { type: String, required: [true, 'El nombre del producto es necesario']	},
        nombreCorto: { type: String, required: [true, 'El nombre corto del producto es necesario']	},
        descripcion: { type: String, required: [true, 'La descripcion del producto es necesaria']	},
        precio: { type: Number, required: [true, 'El precio del producto es necesario']	},
        tienePrecioAbierto: { type: Boolean },
        fechaAlta: { type: Date },
        fechaActualizacion: { type: Date },
        imprimir: { type: Boolean },
        impresoraComandas: { type: Schema.Types.ObjectId, ref: 'ImpresoraComandas' },
        img: { type: String, required: false },
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
},	{	collection: 'productos' });

module.exports = mongoose.model('Producto', productoSchema);