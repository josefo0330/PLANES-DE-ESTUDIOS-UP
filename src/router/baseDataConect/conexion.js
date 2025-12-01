 var mysql = require('mysql');

   const conexion = mysql.createPool({
        host: 'btiaphkz1zqolfvrqhg4-mysql.services.clever-cloud.com',
        database:"btiaphkz1zqolfvrqhg4",//'if0_36456925_cruv',
        user:'uxf3zc6yzkruyzpu',
        password:'UwQLSRFiJORf24CmY3Mx'         // Unlimited queue for waiting connections
    });


module.exports = conexion;/*
conexion.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO `carrera` (`id_carrera`, `nombre_carrera`, `id_facultad`) VALUES?"
  let values=[
[1, 'Lic. Administración de Empresas\r\n', 1],
[2, 'Lic. Contabilidad\r\n', 1],
[3, 'Lic. Administración en Recursos Humanos\r\n', 1],
[4, 'Lic. Ingeniería Operaciones\r\nLogística Empresarial', 1],
[5, 'Lic. Administración Pública\r\n', 2],
[6, 'Lic. Trabajo Social\r\n', 2],
[7, 'Lic. Arquitectura\r\n', 3],
[8, 'Lic. Música', 4],
[9, 'Lic. Ingeniero Agrónomo\r\nZootecnísta\r\n', 5],
[10, 'Lic. Educación Primaria\r\n', 6],
[11, 'Lic. Educación Preescolar\r\n', 6],
[12, 'Lic. Matemáticas', 7],
[13, 'Lic. Biología', 7],
[14, 'Lic. Periodismo\r\n', 8],
[15, 'Lic. Evento y Protocolo\r\n', 8],
[16, 'Lic. Derecho\r\n', 9],
[17, 'Lic. Economía\r\n', 10],
[18, 'Lic. Finanzas y Bancas\r\n', 10],
[19, 'Lic. Enfermería\r\n', 11],
[20, 'Tec. Farmacia\r\n', 12],
[21, 'Lic. Español\r\n', 13],
[22, 'Lic. Inglés\r\n', 13],
[23, 'Téc. Inglés Conversacional\npara la Atención a Clientes\n', 13],
[24, 'Lic. Educación Física\r\n', 13],
[25, 'Lic. Geografía e Historia\r\n', 13],
[26, 'Lic. Turismo Alternativo\r\n', 13],
[27, 'Lic. Ingeniería en Informática\r\n', 14],
[28, 'Lic. Informática para la\r\nGestión Educativa y Empresarial', 14],
[29, ' Lic. En Relaciones Públicas', 17],
[30, 'Diseño Grafico', 3],
[31, 'Tec. Asistente Odontológico\r\n', 15],
[32, 'Lic. Psicología ', 16],
[33, 'Téc. Confección de vestuario', 3],
[34, 'Téc. En sanidad vegetal', 5],
[35, 'Lic. Relaciones Públicas', 8],    
[36, 'Lic. Biología (Ambienta) ', 7],
[37, 'Lic. Biología (Marina y Limnología) ', 7],
[38, 'Lic. Biología (Zoología) ', 7]

];
  conexion.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});   

conexion.connect(function(error){
    if(error)
        throw error;
    else{
        console.log('conexion exitosa ');
    }
});
module.exports = conexion;*/ 