const express= require('express');
//const path = require('path');
const router = express.Router();
const path = require('path');
var facult=[];
const fs= require('fs') 
var carreras=[]
conexion = require(path.join(__dirname,'baseDataConect/conexion.js'))
//facultades
conexion.query('SELECT * FROM facultades_u_nacional',function(error,results,fields){
    if (error){
        throw error;
    }
    var i=0
    results.forEach(results => {
       facult[i]=results
       i++
    });
    console.log(facult[3]['id']);
    //document.getElementById('facultades').innerHTML(facultades);
    
});

//crear carpetas
/*conexion.query('SELECT * FROM carrera',function(error,results,fields){
    if (error){
        throw error;
    }
    var i=0
    results.forEach(results => {
       carreras[i]=results
       i++
    });
    for(var j=0;j<carreras.length;j++){
        fs.mkdir(path.join(__dirname,'recursos',carreras[j]['id_carrera']+''), (err) => { 
            if (err) { 
                return console.error(err); 
            } 
        }); 
    }
    console.log(carreras[3]['id']);
    //document.getElementById('facultades').innerHTML(facultades);
});*/
router.get('/',(req,res)=>{
    res.render('index',{facult});
    //res.sendFile(path.join(__dirname,'wiew/index.html'))
    //console.log(path.join(__dirname,'wiew/index.html'));
    
});
router.get('/carrera',(req,res)=>{
    res.render('carrera')
});

//

module.exports = router;
