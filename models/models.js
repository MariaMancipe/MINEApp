var mongoose = require("mongoose");
var e = require("../models/estudiante");
mongoose.connect('mongodb://mine:mine@ds127938.mlab.com:27938/mineapp');

var db = mongoose.connection;
db.on("error", console.error.bind(console,"Connection error:"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});
var estudiante = mongoose.model("Estudiante", e.estudianteSchema);
module.exports.estudiante = estudiante;