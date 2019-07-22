var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var rubroSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre del rubro es necesario']	},
				: { type: String, required: [true, 'La  de la rubro es necesaria']	},
				seccion: { type: Schema.Types.ObjectId, ref: 'Seccion' },
				usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'rubros' });

module.exports = mongoose.model('Rubro', rubroSchema);