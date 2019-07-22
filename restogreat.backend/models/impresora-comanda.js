var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var impresoraComandaSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre de la impresora de comandas es necesario']	},
				: { type: String, required: [true, 'La  de la impresora de comandas es necesaria'] },
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'impresorasComandas' });

module.exports = mongoose.model('ImpresoraComandas', impresoraComandaSchema);