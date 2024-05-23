const express= require('express');
const router = express.Router();
const path = require('path');
var facult=[];
const carreras=[];
var aux1;
const fs= require('fs') 
const pdfparse = require('pdf-parse')
var numCarpeta='' //numero de la carpeta a buscar
conexion = require(path.join(__dirname,'baseDataConect/conexion.js'))
// se carga las carreras en el select de manera dinamica
router.post('/',(req,res)=>{
    var j;
    //const { name } = req.body;
    const { name } = req.body;
    conexion.query('SELECT * FROM carrera WHERE id_facultad='+name,function(error,results,fields){
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
        
        res.json(carreras)
        carreras.splice(0)
        //document.getElementById('facultades').innerHTML(facultades);
    });

    console.log(aux1)
})
router.post('/archivo',(req,res)=>{
    var { id } = req.body;
    numCarpeta= id+''
    console.log('numero de la carpeta:'+numCarpeta)
})

router.post('/tabla',(req,res)=>{
    var ruta='hola';
    /*fs.readdir(path.join(__dirname,'recursos',numCarpeta), function (err, archivos) {
        if (err) {
        onError(err);
        return;
        }
       console.log('archivo: '+archivos[0])
        
        })*/
        /////////////////////////////////////////// folder
        var aux;
        ruta=fs.readdirSync(path.join(__dirname,'recursos',numCarpeta)); 
    //const pdffile 
    aux = fs.readFileSync(path.join(__dirname,'recursos',numCarpeta,ruta[0]),'UTF-8')
    //pdfparse(pdffile).then(function(data){
           // aux.text= data.text.toString()
            //console.log(data)
            res.json(aux)
//})
});
module.exports = router;