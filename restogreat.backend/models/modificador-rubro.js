var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var modificadorRubroSchema =	new Schema({
				nombre: { type: String, required: [true, 'El modificador de rubro es necesario']	},
				: { type: String, required: [true, 'La  del modificador de rubro es necesaria']	},
				rubro: { type: Schema.Types.ObjectId, ref: 'Rubro' },
				usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
				fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'modificadoresRubro' });

module.exports = mongoose.model('ModificadorRubro', modificadorRubroSchema);