var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var comensalSchema =	new Schema({
                cuenta: { type: Schema.Types.ObjectId, ref: 'Cuenta' },
                numcomensal: { type: Number	},
                producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
                modificadores: { type: String },
                estatus: { type: Number },

                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'comensales' });

module.exports = mongoose.model('Comensal', comensalSchema);