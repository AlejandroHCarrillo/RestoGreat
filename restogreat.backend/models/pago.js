var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;

var pagoSchema =	new Schema({
                cuenta: { type: Schema.Types.ObjectId, ref: 'Cuenta' },
                formaPago : {type: Schema.Types.ObjectId, ref: 'FormaPago' },
                monto: { type: Number, required: [true, 'El monto del pago es necesario'], default: 0 },
                referencia: { type: String },
                observaciones: { type: String },
                usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
                fechaAlta: { type: Date },
                fechaActualizacion: { type: Date }
},	{	collection: 'pagos' });

module.exports = mongoose.model('Pago', pagoSchema);