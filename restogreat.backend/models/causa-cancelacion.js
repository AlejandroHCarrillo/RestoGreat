var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var causaCancelacionSchema =	new Schema({
				nombre: { type: String, required: [true, 'La causa de la cancelacion es necesaria']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la causa de cancelacion es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'causascancelacion' });

module.exports = mongoose.model('CausaCancelacion', causaCancelacionSchema);