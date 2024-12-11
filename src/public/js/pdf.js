$(document).ready(function () {
    const URI = '/api/products/tabla';
    const URL2='/api/products/Materias'
    var vectObject=[]
    $.ajax({
        url: URI,
        type: 'POST',
        success: function (response) {
          // console.log(response)
            for(var indice=0;indice<response.length;indice++){
                var facult = '';
                var facultNum ="";
                var carrera=''
                var carreraNum="";
                var i = 0;

                var string = dividir('PlanE', response[indice])
            
                var semestre = 'PRIMER AÑO PRIMER SEMESTRE'
                 var auxTitle = dividir('\n', string[0])
                var tituloPrin = '<h1 class="text-black" >UNIVERSIDAD  DE  PANAMÁ </h1>'//'U N I V E R S I D A D  D E  P A N A M Á';
                for (i = 2; i < auxTitle.length - 6; i++){
                    if((auxTitle[i].trim()!='Pagina 1 de 5')&&(auxTitle[i].trim()!='rplanes3.rdf')){
                        if(auxTitle[i].trim().search("Facultad")>-1){
                            facult=auxTitle[i].trim().split(":")
                            facult=facult[1].trim().split(" ")
                            facultNum+= facult[0]+facult[1]
                            for (var x=2;x<facult.length;x++){
                                facultNum+=" "+facult[x]

                            }
                            
                        }
                        if(auxTitle[i].trim().search("Carrera")>-1){
                            console.log(auxTitle[i].trim())
                            carrera=auxTitle[i].trim().split(":")
                            carrera=carrera[1].trim().split(" ")
                            carreraNum+= carrera[0]+carrera[1]
                            for (var x=2;x<carrera.length;x++){
                                carreraNum+=" "+carrera[x]

                            }
                            console.log(carreraNum)
                        }
                    }
                }
                //console.log(facultNum)
                //console.log(carreraNum)
                plan=[]
                var materias;
                for (i = 1; i < string.length; i++) {
                    var string2=''
                    //tablas = tablas + '<br> <br><table  class="table table-success table-striped  table-bordered"> <h3 class="text-black">' + semestre + '</h3>'
                    string2= dividir('------ H  O  R  A  S -------', string[i])
                    string2 = dividir('\n', string2[0])
                    materias=[]
                    //console.log(string2)
                    semestre=depurar(string2,materias, semestre)
                    plan[i]=materias
                // console.log(materias)
                // console.log('##################')
                }
                console.log(plan)
                var aux=[]
                var suma=0
                for (i=1;i<plan.length;i++){
                    aux=plan[i]
                    addObject(aux,vectObject, facultNum,carreraNum)
                    aux=[]
                    suma+= plan[i].length

                }
                //console.log(plan)
                //console.log(indice+1+"-"+suma)
        }  
        $.ajax({
            url: URL2,
            type: 'POST',
            data: {'vectObject': vectObject}, 
            
        }).done(function() {
            console.log(vectObject)  
            alert("datos enviados")
          });
        },
        error: function (err) {
            console.log(err);
        }
    })
});
function dividir(sep, cad) {
    var nuevaCad = cad.split(sep)
    return nuevaCad;
}
function comparar(cad1, cad2) {
    var n = cad1.localeCompare(cad2)

    return n;
}
function depurar (datos, datosClean,semestre){
    var j=0
    var i=0
    var sw=0
    var concurrencias=[]
    concurrencias[0]="";concurrencias[1]="  ";// contiene concurrencias que deben ser elimninadas
    concurrencias[2]="                                                                        "
    aux=[]

    while ( i<datos.length && sw==0/*datos[i].search()*/){
        // despues de la fecha hay datos inrelevantes
        if(datos[i].search("Fecha:")>-1){
            sw=1
            
        }
        else{
            if ((datos[i].trim().length>0)&&(datos[i].search("FUNDAMENTAL")>-1||datos[i].search("REGULAR")>-1||datos[i].search("OPTATIVA")>-1)){
                datosClean[j]=datos[i]
                j++
            }
        }
        i++
    }
    datosClean[j]= semestre
    for(i=0;i<datos.length;i++){
        if(datos[i].search("PRIMER")>-1 || datos[i].search("SEGUNDO")>-1 || datos[i].search("TERCER")>-1 || datos[i].search("CUARTO")>-1 || datos[i].search("QUINTO")>-1)               
            semestre=datos[i];// ultima posicion () el semestre siguiente
    }
    //console.log(aux)
    return(semestre)
}
function CorrerVect(pos, vector){
    // pos es la posicion que se quiere dejar vacia, por consiguiente todo elemenento adelante de el se corre
    i=vector.length
    while(i>pos){
        vector[i]=vector[i-1]
        i--
    }
}
function dropConcurr(plan,n,planF){
    var aux;
    var aux2=[]
    var j=0
    var i=0
    var sw=0
    //console.log(planFinal)
    while(i<n && sw==0){
        aux=plan[i].split(" ");
        if(aux.length<4 && plan[i].search("VERANO")==-1){
        }
        else{
            if(plan[i].search("Facultad")>-1){
                
                sw=1
            }
            else{
                aux2[j]=plan[i];
                planF[j]= aux2[j]
                j++
            }
        }
        i++
    }
   //console.log(aux2)
   
}
function addObject (materiaData, vectObject,facultad, carrera){
    var aux;
    var i=0;
    var j=0;
    var sw=0; 
    var object;
    var ano= materiaData[materiaData.length-1]
    for(j=0;j<materiaData.length-1;j++){
        sw=0
        object={};
        aux=""
        i=0
        
        var datos=materiaData[j].split(" ")
        var n= datos.length
        object.asignatura= datos[0]
        if (parseInt(datos[2])){
            object.abrevNum=''+datos[1]+datos[2]
            i=i+3
        }
        else{
            object.abrevNum=''+datos[1]
            i++
        }
        // en este while se toma todo el nombre de la materia para agregarlo en una sola columna, ya que contiene espacio
        while(i<n&&sw==0){
            if(!parseInt(datos[i])){
                aux+= datos[i]+" "
                
            }
            
            else{
                //alert(aux)
                object.nombre=''+aux
                sw=1

            }
            i++;
        }
        sw=0
        //alert(datos[i-1])
        i--
        while(i<n&&sw==0){
            //alert("entre")
            if(datos[i].search("FUNDAMENTAL")>-1 ||datos[i].search("REGULAR")>-1 || datos[i].search("OPTATIVA")>-1){
                object.tipo=''+datos[i]
                sw=1
            }
            i++
        }
        object.facultad= facultad.substring(0,2)+'-'+facultad.substring(2).trim()
        object.carrera= carrera.substring(0,2)+'-'+carrera.substring(2).trim()
        object.year= ano
        ///console.log(vectObject.length)
        vectObject.push(object)
    }
}
//PlanE