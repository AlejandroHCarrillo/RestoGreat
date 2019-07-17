var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var facturaSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la factura es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la factura es necesaria']	},
				usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
				fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'facturas' });

module.exports = mongoose.model('Factura', facturaSchema);