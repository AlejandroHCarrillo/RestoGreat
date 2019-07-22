var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var pagoSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la pago es necesario']	},
				clave: { type: String, required: [true, 'La clave de la pago es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }                
},	{	collection: 'pagos' });

module.exports = mongoose.model('Pago', pagoSchema);