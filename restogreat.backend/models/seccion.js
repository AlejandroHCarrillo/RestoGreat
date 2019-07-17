var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var seccionSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la seccion es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la seccion es necesaria']	},
				usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
				fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }

},	{	collection: 'secciones' });

module.exports = mongoose.model('Seccion', seccionSchema);