var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var corteCajaSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la corteCaja es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la corteCaja es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'cortescaja' });

module.exports = mongoose.model('CorteCaja', corteCajaSchema);