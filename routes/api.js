var express = require('express');
var multer = require('multer');
var xlstojson = require('xls-to-json-lc');
var xlsxtojson = require('xlsx-to-json-lc');
var models = require('../models/models');
var router = express.Router();

//--------MULTER METHODS------------//

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

//-------------REST API------------//


/* GET users listing. */
router.get('/estudiantes', function(req, res) {
    models.estudiante.find(function(err, estudiantes){
        if(err)
            res.send(err);
        else
            res.json(estudiantes);
    });
});
router.post('/estudiantes', function(req, res) {
    e = new models.estudiante({
        nombresApellidos: req.body.nombresApellidos,
        correoUniandes: req.body.correoUniandes,
        correoAlterno: req.body.correoAlterno,
        codigo: req.body.codigo,
        semestre: req.body.semestre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        empresa: req.body.empresa,
        fechaNacimiento: req.body.fechaNacimiento,
        estado : req.body.estado,
        maestria: req.body.maestria,
    });
    e.save(function (err) {
       if(err)
           res.send("Hubo un errore en la bd");
       else
            res.send("El estudiante se creo exitosamente");
    });
});
router.post('/estudiantes/cargue/:estado/:maestria', function(req,res){
    var exceltojson;
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }else{

                    var errores = [];
                    var estudiantes = [];
                    var e;
                    for(var i=0; i<result.length;i++){
                        var n = (result[i].nombres)? result[i].nombres:"";
                        var a = (result[i].apellidos)? result[i].apellidos:"";
                        e = null;
                        e = new models.estudiante({
                            nombresApellidos:n+" "+a,
                            correoUniandes: (result[i].correoUniandes)?result[i].correoUniandes:"No registra",
                            correoAlterno:(result[i].correoAlterno)?result[i].correoAlterno:"No registra",
                            codigo : (result[i].codigo)? result[i].codigo: -1,
                            semestre: (result[i].semestre)? result[i].semestre: -1,
                            telefono: (result[i].telefono)? result[i].telefono: "No Registra",
                            direccion: (result[i].direccion)? result[i].direccion:"No Registra",
                            empresa: (result[i].empresa)? result[i].empresa:"No registra",
                            fechaNacimiento: (result[i].fechaNacimiento)? result[i].fechaNacimiento:new Date(),
                            estado :req.params.estado,
                            maestria:req.params.maestria
                        });
                        e.save(function (err) {
                            if (err){
                                errores.push(err);
                            }else{
                                estudiantes.push(e);
                            }
                        });
                    }
                    if(errores.length == 0)
                        res.json("Errores"+i);
                    else
                        res.json("Aciertos"+i);
                }


            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    })
});
router.get('/estudiantes/:estudiante_id', function(req, res) {
    models.estudiante.findById(req.params.estudiante_id,function(err, estudiante){
        if(err)
            res.send(err);
        else
            res.json(estudiante);
    });
});
router.put('/estudiantes/:id', function(req, res) {
    res.json('respond with a resource');
});

module.exports = router;
