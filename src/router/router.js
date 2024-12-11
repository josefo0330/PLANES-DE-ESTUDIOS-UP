const express= require('express');
//const path = require('path');
const router = express.Router();
const path = require('path');
var facult=[];
const fs= require('fs') 
var carreras=[]

router.get('/',(req,res)=>{
    res.render('index');
    //res.sendFile(path.join(__dirname,'wiew/index.html'))
    //console.log(path.join(__dirname,'wiew/index.html'));
    
});
router.get('/carrera',(req,res)=>{
    res.render('carrera')
});

//

module.exports = router;
