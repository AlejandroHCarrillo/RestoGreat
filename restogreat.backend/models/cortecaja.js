var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var cortecajaSchema =	new Schema({
                fecha: { type: Date },
                turno: { type: Schema.Types.ObjectId, ref: 'turno' },
				nombre: { type: String, required: [true, 'El nombre del corte de caja es necesario']	},
				clave: { type: String, required: [true, 'La clave del corte caja es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'cortescaja' });

module.exports = mongoose.model('Cortecaja', cortecajaSchema);