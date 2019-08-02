var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var meseroSchema =	new Schema({
				id: { type: Number },
                nombre: { type: String, required: [true, 'El nombre del mesero es necesario']	},
                apaterno: { type: String, required: [true, 'El apellido del mesero es necesario']	},
                amaterno: { type: String, },
                nivel:  { type: Number },
                password:  { type: String },
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'meseros' });

module.exports = mongoose.model('Mesero', meseroSchema);