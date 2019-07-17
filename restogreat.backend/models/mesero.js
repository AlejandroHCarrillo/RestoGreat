var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var meseroSchema =	new Schema({
				numero: { type: Number },
                nombre: { type: String, required: [true, 'El nombre de la mesero es necesario']	},
                nivel:  { type: Number },
                password:  { type: String },
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'meseros' });

module.exports = mongoose.model('Mesero', meseroSchema);