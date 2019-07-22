var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var formaPagoSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la forma de pago es necesario']	},
				: { type: String, required: [true, 'La  de la forma de pago es necesaria']	},
				tipo: { type: String, required: [true, 'El tipo de la forma de pago es necesario']	},
				comision: { type: Number },
				usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
				fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'formaspago' });

module.exports = mongoose.model('FormaPago', formaPagoSchema);