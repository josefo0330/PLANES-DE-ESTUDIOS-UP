$(document).ready(function () {
    const URI = '/api/products/tabla';
    $.ajax({
        url: URI,
        type: 'POST',
        success: function (response) {
           //console.log(response)
            var tablas = ''
            var i = 0;
            //console.log(response)
            var string = dividir('PlanE', response)
           //console.log(string[1])
            var semestre = 'PRIMER AÑO PRIMER SEMESTRE'
           var auxTitle = dividir('\n', string[0])
            var tituloPrin = '<h1 class="text-white" >UNIVERSIDAD  DE  PANAMÁ </h1>'//'U N I V E R S I D A D  D E  P A N A M Á';
            for (i = 2; i < auxTitle.length - 6; i++){
                if((auxTitle[i].trim()!='Pagina 1 de 5')&&(auxTitle[i].trim()!='rplanes3.rdf')){
                    tituloPrin = tituloPrin +'<br><br><h5">' +  auxTitle[i] +'</h5>'
                }
            }
            $('#titleP').html(tituloPrin)
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
            for (i=1;i<plan.length;i++){
                aux=plan[i]
                tablas = tablas + '<br> <br><table  class="table table-success table-striped  table-bordered"> <h3 class="text-white">' + aux[aux.length-1] + '</h3>'
                tablas = tablas + `
                <thead class="table-dark">
                <tr>
                <th>ASIG</th>
                <th>ABREV/NUM</th>
                <th>NOMBRE</th> 
                <th>CR</th>
                <th>TEO</th>
                <th>PRAC</th>
                <th>CLIN</th>
                <th>LAB</th>
                <th>TIPOMATERIA</th>
                </tr>
                </thead> 
                `
                tablas+= addFila(aux)
                tablas+="</table>"
                aux=[]

            }
            
            $("#tablas").html(tablas);
           // console.log(planFinal)
            //var string2 =  dividir('\n',string[1])
            //$('#parrafo').html(response.)
            //console.log(tablas)
            
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
   console.log(aux2)
   
}
function addFila (materiaData){
    var tabla=""
    var aux;
    var i=0;
    var j=0;
    var sw=0;
    var datos;
    for(j=0;j<materiaData.length-1;j++){
        sw=0
        tabla+="<tr>"
        aux=""
        i=0
        var vector=materiaData[j].split(" ")
        datos=[]
        DropSpace(vector,datos)
        console.log(datos)
        var n= datos.length
        tabla+="<td>"+datos[0]+"</td>"
        if (parseInt(datos[2])){
            tabla+="<td>"+datos[1]+datos[2]+"</td>" 
            i=i+3
        }
        else{
            tabla+="<td>"+datos[1]+"</td>"
            i++
        }
        // en este while se toma todo el nombre de la materia para agregarlo en una sola columna, ya que contiene espacio
        while(i<n&&sw==0){
            if(!Number(datos[i])){
                aux+= datos[i]+" "
                
            }
                
            else{
                    //alert(aux)
                tabla+="<td>"+aux+"</td>"
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
                tabla+="<td>"+datos[i]+"</td>"
                sw=1
            }
            else{
                tabla+="<td>"+datos[i]+"</td>"
            }
            i++
        }
        tabla+="</tr>"

    }
    return(tabla)
}
function DropSpace(vector1,vector2){
    var j=0
    for (var i=0;i<vector1.length;i++){
        if(!vector1[i]==""){
            vector2[j]=vector1[i]
            j++
        }
    }
}
//PlanE