var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var conceptodescuentoSchema =	new Schema({
				nombre: { type: String, required: [true, 'El concepto del descuento es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion de la concepto del descuento es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'conceptosdescuentos' });

module.exports = mongoose.model('ConceptoDescuento', conceptodescuentoSchema);