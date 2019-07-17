var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var bancoSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la banco es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la banco es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }

},	{	collection: 'bancos' });

module.exports = mongoose.model('Banco', bancoSchema);