var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var turnoSchema =	new Schema({
    fecha: { type: Date, required: [true, 'La fecha del turno es necesaria'] },
    numero: { type: Number, required: [true, 'El numero de turno es necesario']	},
    cajero: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fondocaja: { type: Number },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fechaAlta: { type: Date },
    fechaActualizacion: { type: Date }
},	{ collection: 'turnos' });

module.exports = mongoose.model('Turno', turnoSchema);