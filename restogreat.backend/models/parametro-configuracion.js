var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var parametroConfiguracionSchema =	new Schema({
				nombre: { type: String, required: [true, 'El nombre del parametro de configuracion es necesario']	},
				abreviacion: { type: String, required: [true, 'La abreviacion del parametro de configuracion es necesaria']	},
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'parametrosconfiguracion' });

module.exports = mongoose.model('ParametroConfiguracion', parametroConfiguracionSchema);