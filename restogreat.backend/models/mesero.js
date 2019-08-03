var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var meseroSchema =	new Schema({
				numero: { type: Number },
                nombre: { type: String, required: [true, 'El nombre del mesero es necesario']	},
                apaterno: { type: String, required: [true, 'El apellido del mesero es necesario']	},
                amaterno: { type: String, },
                nombrecorto: { type: String	},
                nivel:  { type: Number },
                img: { type: String, required: false },

                edad: { type: Number },
                sexo: { type: String },
                password:  { type: String },

                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'meseros' });

module.exports = mongoose.model('Mesero', meseroSchema);