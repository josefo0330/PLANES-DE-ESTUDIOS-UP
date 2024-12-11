const express= require('express');
const router = express.Router();
const path = require('path');
var facult=[];
const carreras=[];
var aux1;
var aux
const fs= require('fs') 
const pdfparse = require('pdf-parse')
var numCarpeta='' //numero de la carpeta a buscar
var conexion = require(path.join(__dirname,'baseDataConect/conexion.js'))
var modeloSchema; //require(path.join(__dirname,'baseDataConect/asignatura.js'))
const mongoose = require("mongoose");
// se carga las carreras UP
conexion.query('SELECT * FROM carrera',function(error,results,fields){
        if (error){
            throw error;
        }
        var i=0
        results.forEach(results => {
           carreras.push({ 
               id: results['id_carrera'],
               name :results['nombre_carrera']
           } )
           aux=carreras[0].name
        });
});


router.post('/tabla',(req,res)=>{
    var Carpetas=[]
    carreras.forEach(results =>{
        var ruta='hola';
        var aux;
        numCarpeta= results.id
        ruta=fs.readdirSync(path.join(__dirname,'recursos',numCarpeta.toString())); 
        aux = fs.readFileSync(path.join(__dirname,'recursos',numCarpeta.toString(),ruta[0]),'UTF-8')
        Carpetas.push(aux)
        //console.log(results.id)
    })
    res.json(Carpetas)

//})
});
router.post('/Materias',(req,res)=>{
    var datas= []
    console.log(req.body)
    datas= req.body
    datas = Object.values(datas)
    datos= datas[0]
    console.log(datas.length)
    var datoE= mongoose.Schema({
        abrevNum: String,
        asignatura: String,
        carrera: String,
        facultad:String,
        nombre:String,
        tipo: String,
        anoSemestre: String,
      })
    modeloSchema=mongoose.model("materias", datoE);
    modeloSchema.deleteMany(
        {}).then(
           async function () {
                // Success
                console.log("Data deleted");
                var est;
                for (var i=0;i<datos.length;i++){
                    est= datos[i];
                    //console.log("los datos son: "+est)
                    const newEst = new modeloSchema({
                        abrevNum: est.abrevNum,
                        asignatura: est.asignatura,
                        carrera: est.carrera,
                        facultad:est.facultad,
                        nombre:est.nombre,
                        tipo: est.tipo,
                        anoSemestre: est.year,
                      });
                      const estudiante =  newEst.save();
                }
            }).catch(
                function (error) {
                    // Failure
                    console.log(error);
                });
    res.send("hola") 

});
module.exports = router;