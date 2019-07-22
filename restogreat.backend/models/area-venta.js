var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var areaVentaSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la area de venta es necesario']	},
                clave: { type: String, required: [true, 'La clave del area de venta es necesaria']	},
				mesainicio: { type: Number },
				mesafin: { type: Number },
                cargoservicio: { type: Number },
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }                
},	{	collection: 'areasventa' });

module.exports = mongoose.model('AreaVenta', areaVentaSchema);