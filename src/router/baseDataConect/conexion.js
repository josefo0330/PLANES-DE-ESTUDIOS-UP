var mysql = require('mysql');
/*var conexion = mysql.createConnection({
    host: 'localhost',
    database:"cruv",//'if0_36456925_cruv',
    user:'root',
    password:''
});*/
var conexion = mysql.createConnection({
    host: 'btiaphkz1zqolfvrqhg4-mysql.services.clever-cloud.com',
    database:"btiaphkz1zqolfvrqhg4",//'if0_36456925_cruv',
    user:'uxf3zc6yzkruyzpu',
    password:'UwQLSRFiJORf24CmY3Mx'
});
conexion.connect(function(error){
    if(error)
        throw error;
    else{
        console.log('conexion exitosa ');
    }
});
module.exports = conexion;