var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var cuentaSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la cuenta es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la cuenta es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'cuentas' });

module.exports = mongoose.model('Cuenta', cuentaSchema);