var mysql = require('mysql');
var conexion = mysql.createConnection({
    host: 'localhost',
    database:"cruv",//'if0_36456925_cruv',
    user:'root',
    password:''
});
conexion.connect(async function(error){

    if(error)
        throw error;
    else{
        console.log('conexion exitosa ');
    }
    
});
module.exports = conexion;