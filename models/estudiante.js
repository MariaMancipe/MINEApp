/**
 * Created by Q551 on 10/12/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var estudianteSchema = new Schema({
    nombresApellidos:String,
    correoUniandes: String,
    correoAlterno:String,
    codigo :Number,
    semestre:Number,
    telefono: String,
    direccion: String,
    empresa: String,
    fechaNacimiento: Date,
    estado :String,
    maestria:String,
    materias:{
        fundamentacion:[String],
        profundizacion:[String],
        electivas:[String],
        proyectoFinal: Boolean,
        retiradas:[String]
    }
});


// make this available to our users in our Node applications
module.exports.estudianteSchema = estudianteSchema;