// Juego

if(sessionStorage['jugando']==null){

    sessionStorage.setItem('jugando', '0'); //JUGANDO || 0: COLOCAR FICHAS || 1: TURNO DE ROJO || 2: TURNO DE VERDE
}

if(sessionStorage['goles1']==null || sessionStorage['goles2']==null){

    sessionStorage.setItem('goles1','0');
    sessionStorage.setItem('goles2','0');
}



var fichas1; //fichas restantes en el banquillo del equipo verde
var fichas2; //fichas restantes en el banquillo del equipo rojo

var contFichasR = 0;
var contFichasV = 0;

function comprobarAccesoJuego(){
    if(sessionStorage['equipo1']==null || sessionStorage['equipo2']==null){
        location.replace('index.html');
    }
}

function dibujarCampoFutbol(){

    let cv = document.getElementById('campo'),
        ctx = cv.getContext('2d'),
        dim = cv.width / 20;

    //console.log(dim);

    // fondo terreno
    /*ctx.beginPath();
    ctx.rect(dim, dim, dim*18, dim*9);
    ctx.fillStyle = "#BDFFBA";
    ctx.fill();

    // fondo porteria 1
    ctx.beginPath();
    ctx.rect(0, dim*4, dim, dim*3);
    ctx.fillStyle = "#728491";
    ctx.fill();

    // fondo porteria 2
    ctx.beginPath();
    ctx.rect(dim*19, dim*4, dim, dim*3);
    ctx.fillStyle = "#728491";
    ctx.fill();*/
    // lineas canvas terreno

    ctx.beginPath(); //para limpiar y que no se ponga todo del mismo color, tam, etc
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#009378';

    for(let i = 0; i <= 20; i++){
        if(i >= 1 && i <= 19){

            //lineas verticales
            ctx.moveTo(dim * i, dim);
            ctx.lineTo(i * dim, cv.height);

            //lineas horizontales
            ctx.moveTo(dim, dim * i);
            ctx.lineTo(cv.width-dim, i * dim);

            if(i >= 4 && i <= 7){     

                //porteria 1 lineas horizontales
                ctx.moveTo(0, dim * i);
                ctx.lineTo(dim, i * dim);

                //porteria 2 lineas horizontales
                ctx.moveTo(cv.width-dim, dim * i);
                ctx.lineTo(cv.width, i * dim);

                if(i == 4){

                    //porteria 1 lineas verticales 
                    ctx.moveTo(0, dim*4);
                    ctx.lineTo(0, dim*7);

                    //porteria 2 lineas verticales 
                    ctx.moveTo(cv.width, dim*4);
                    ctx.lineTo(cv.width, dim*7);    

                }
            }
        }
    }

    //ctx.rect(1, 1, cv.width - 1, cv.height - 1);
    //ctx.rect(0, 0, cv.width - 1, cv.height - 1);
    ctx.stroke(); //pintar;

    // Círculo central 
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1C44AC';
    ctx.arc(cv.width/2,(cv.height/2) + dim/2,25,0,2*Math.PI); 
    ctx.stroke();

    // Semicirculo área 1
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1C44AC';
    ctx.arc(dim*4,(cv.height/2) + dim/2,25,1.5*Math.PI,0.5*Math.PI);
    ctx.stroke();

    // Semicirculo área 2
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '1C44AC';
    ctx.arc(dim*16,(cv.height/2) + dim/2,25,0.5*Math.PI,1.5*Math.PI);
    ctx.stroke();

    // Líneas de banda y de juego
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '1C44AC';

    // También se pueden hacer estas lineas con un cuadrado,
    // pero lo he hecho así para probar nuevas formas.
    // izquierda
    ctx.moveTo(dim, dim);
    ctx.lineTo(dim, cv.height);

    // derecha
    ctx.moveTo(cv.width-dim, dim);
    ctx.lineTo(cv.width-dim, cv.height);

    // superior
    ctx.moveTo(dim, dim);
    ctx.lineTo(cv.width-dim, dim);

    // inferior
    ctx.moveTo(dim, cv.height);
    ctx.lineTo(cv.width-dim, cv.height);

    // área 1
    ctx.rect(dim, dim*3, dim*3, dim*5);

    // área 2
    ctx.rect(cv.width-dim*4, dim*3, dim*3, dim*5);
    ctx.stroke();

    // Línea central
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '1C44AC';
    ctx.moveTo(cv.width/2, dim);
    ctx.lineTo(cv.width/2, cv.height);
    ctx.stroke();

}


function redibujarCanvasTerreno(){

    let cv = document.getElementById('campo'),
        ctx = cv.getContext('2d'),
        img = new Image(),
        dim = cv.width / 20;

    //cv.width = cv.width;

    dibujarCampoFutbol();

    img.onload = function(){
        let dim = cv.width / 20,
            fila = Math.floor(y / dim),
            columna = Math.floor(x / dim);

        //ctx.drawImage(img,x,y);

        if(fila!=0 && columna!=0 && columna!=19){
            ctx.drawImage(img, columna*dim, fila*dim, dim, dim);
        }
    }
    img.src = document.getElementById(id).src;
}

imgRoja = new Image();
imgVerde = new Image();

imgRoja.src = 'fichaRoja.svg'; // document.getElementById(id).src
imgVerde.src = 'fichaVerde.svg';

function randomFichas1(e){

    let cv = document.getElementById('campo'),
        x = e.offsetX,
        y = e.offsetY,
        dim = cv.width / 20,
        fila = Math.floor(y / dim),
        columna = Math.floor(x / dim),
        esta = true,
        jugador = e.id,
        ctx = cv.getContext('2d');

        cantidadFichasRojas=0;
        cantidadFichasVerdes=0;
        cv.width = cv.width;

    dibujarCampoFutbol();

    //if(jugador=="j1"){ 
        let salcagadoleches=false;
        for(let i=0; i<5; i++){
            //Asignar valor columan e fila    
            while(esta){
                columna=Math.round(Math.random()*8)+1;
                fila=Math.round(Math.random()*8);
                if(cantidadFichasRojas>0){
                    for(let ficha=0; ficha<=cantidadFichasRojas; ficha++){
                        if(parseInt(sessionStorage["fichaR"+ficha+"x"])==columna && parseInt(sessionStorage["fichaR"+ficha+"y"])==fila){
                            salcagadoleches=true;
                        }
                        //else
                        console.log("ficha " + ficha + " "+ parseInt(sessionStorage["fichaR"+ficha+"x"]) + " comparado con "  + parseInt((columna*dim-dim/4)-2))  ;
                    }
                    if(salcagadoleches!=true){
                        esta=false
                    }
                }else{                
                    esta=false;
                }
                salcagadoleches=false;
            }//While esa ficha esta repetida

            //Dibujar la ficha
            sessionStorage["fichaR"+cantidadFichasRojas+"x"]=columna;
            sessionStorage["fichaR"+cantidadFichasRojas+"y"]=fila;
            ctx.drawImage(imgRoja, columna * dim, fila * dim, dim, dim);

            cantidadFichasRojas = cantidadFichasRojas+1;
            sessionStorage["NumfichasRojas"] = null;
            sessionStorage["NumfichasRojas"] = cantidadFichasRojas;
            esta=true;
            salcagadoleches=false;
        }//for(let i=0; i<5; i++){

    //}else{

    //}
}

function randomFichas2(e){

    let cv = document.getElementById('campo'),
        x = e.offsetX,
        y = e.offsetY,
        dim = cv.width / 20,
        fila = Math.floor(y / dim),
        columna = Math.floor(x / dim),
        esta = true,
        jugador = e.id,
        ctx = cv.getContext('2d');

        cantidadFichasRojas=0;
        cantidadFichasVerdes=0;
        cv.width = cv.width;

    dibujarCampoFutbol();

    //if(jugador=="j1"){ 
        let salcagadoleches=false;
        for(let i=0; i<5; i++){
            //Asignar valor columan e fila    
            while(esta){
                columna=Math.round(Math.random()*8)+10;
                fila=Math.round(Math.random()*8);
                if(cantidadFichasRojas>0){
                    for(let ficha=0; ficha<=cantidadFichasRojas; ficha++){
                        if(parseInt(sessionStorage["fichaR"+ficha+"x"])==columna && parseInt(sessionStorage["fichaR"+ficha+"y"])==fila){
                            salcagadoleches=true;
                        }
                        //else
                        console.log("ficha " + ficha + " "+ parseInt(sessionStorage["fichaR"+ficha+"x"]) + " comparado con "  + parseInt((columna*dim-dim/4)-2))  ;
                    }
                    if(salcagadoleches!=true){
                        esta=false
                    }
                }else{                
                    esta=false;
                }
                salcagadoleches=false;
            }//While esa ficha esta repetida

            //Dibujar la ficha
            sessionStorage["fichaR"+cantidadFichasRojas+"x"]=columna;
            sessionStorage["fichaR"+cantidadFichasRojas+"y"]=fila;
            ctx.drawImage(imgVerde, columna * dim, fila * dim, dim, dim);

            cantidadFichasRojas = cantidadFichasRojas+1;
            sessionStorage["NumfichasRojas"] = null;
            sessionStorage["NumfichasRojas"] = cantidadFichasRojas;
            esta=true;
            salcagadoleches=false;
        }//for(let i=0; i<5; i++){

    //}else{

    //}
}

// Permite poner las fichas en el canvas del tereno de juego
function prepararDragnDropFichas(){

    //Zona drag (las fichas)
    let v = document.querySelectorAll('body>div>div>span>img');

    for (let i = 0; i < v.length; i++) {

        v[i].setAttribute('draggable', 'true');
        //v[i].id = 'img' + i;
        console.log('caca');

        v[i].ondragstart = function(e){
            e.dataTransfer.setData('text/plain', v[i].id);
        }
    }

    //Zona drop
    let cv = document.getElementById('campo');
    cv.ondragover = function(e) {

        e.preventDefault();
        e.stopPropagation();

        let x = e.offsetX,
            y = e.offsetY,
            ctx = cv.getContext('2d'),
            dim = cv.width / 20,
            fila = Math.floor(y / dim),
            columna = Math.floor(x / dim);


        console.log('dim:' + dim, 'fil:' + fila, 'col:' + columna);

        dibujarCampoFutbol();

        ctx.beginPath();
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 2;

        if(fila!=0 && columna!=0 && columna!=19){
            ctx.strokeRect(columna*dim, fila*dim, dim, dim); //x,y,ancho,alto    
        }     
    }

    cv.ondrop = function(e){

        e.preventDefault();
        e.stopPropagation();

        let x = e.offsetX,
            y = e.offsetY,
            id = e.dataTransfer.getData('text/plain'),
            ctx = cv.getContext('2d'),
            img = new Image();

        console.log(id);
        img.src = document.getElementById(id).src;
        //cv.querySelector('canvas').appendChild(document.getElementById(id));

        //img.onload = function(){

            let dim = cv.width / 20,
                fila = Math.floor(y / dim),
                columna = Math.floor(x / dim);

            //ctx.drawImage(img,x,y);

            if(fila!=0 && columna!=0 && columna!=19){
                console.log('Fichas rojas:' + contFichasR);
                muestraDado();
                //ctx.drawImage(img, columna*dim, fila*dim, dim, dim);
                console.log(fila, columna);
                if((columna>=1 && columna<=9 && id>=0 && id<=4) && contFichasR<=5){
                    if(contFichasR==5){
                        lanzaMensajeEmergente("GÜARNIN: te has quedado sin fichas rojas en el banquillo");
                    }
                    sessionStorage["ficha1y"] = fila;
                    sessionStorage["ficha1x"] = columna;

                    console.log(sessionStorage["ficha1y"] ,sessionStorage["ficha1x"]);

                    ctx.drawImage(img, columna * dim, fila * dim, dim, dim);

                    console.log(columna*dim, fila*dim, dim, dim);

                    contFichasR++;
                    /*fichas1--;
                    rellenaTeam1();*/

                    // Destacar el cuadro con un cuadro rojo la ficha seleccionada 
                    ctx.beginPath(); //evitar historias
                    ctx.strokeStyle = '#f00';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(columna * dim, fila * dim, dim, dim);

                    botonPartida();
                }

                if((columna>=10 && columna<=18 && id>=5 && id<=9) && contFichasV<=5){
                    if(contFichasV==5){
                    lanzaMensajeEmergente('GÜARNIN: te has quedado sin fichas verdes en el banquillo');
                    }
                    sessionStorage["ficha1y"] = fila;
                    sessionStorage["ficha1x"] = columna;

                    console.log(sessionStorage["ficha1y"] ,sessionStorage["ficha1x"]);

                    ctx.drawImage(img, columna * dim, fila * dim, dim, dim);

                    contFichasV++;
                    /*fichas2--;
                    rellenaTeam2();*/

                    // Destacar el cuadro con un cuadro rojo la ficha seleccionada 
                    ctx.beginPath(); //evitar historias
                    ctx.strokeStyle = '#f00';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(columna * dim, fila * dim, dim, dim);

                    botonPartida();
                }
            }

            dibujarCampoFutbol();
         
        console.log(id);
    }

}

var ficha = { //posicion de la ficha
    "fila": 0,
    "columna": 0
};

// 4 funciones para poder mover la ficha en el interior 
// del canvas del terreno de juego
/*function mouse_move(e){

    // return; //que no devuelva nada
    let cv = e.target,
        x = e.offsetX,
        y = e.offsetY,
        dim = cv.width / 20,
        fila = Math.floor(y / dim),
        columna = Math.floor(x / dim);

    //console.log(ficha.columna, ficha.fila);    
    //console.log(`Posicion: ${x} - ${y}`);

    if (cv.getAttribute('data-down')) { //ESTOY ARRASTRANDO LA FICHA
        console.log(`MOUSEMOVE=>Fila: ${fila} - columna: ${columna}`);
        if (ficha.columna != columna || ficha.fila != fila) {
            ficha.columna = columna;
            ficha.fila = fila;
            redibujarCanvasTerreno();
        }
    }
}*/

/*function destacarFicha(){

    console.log(this.getElementById(0));
    let v = document.querySelectorAll('body>div>div>span>img');

    for (let i = 0; i < v.length; i++) {
        console.log('entramos');

        document.getElementById(i).style.border = "solid red";
        
    }
}*/

function mouse_click(e){
    //return;

    //comprobaciones de botones que aparecen y desaparecen, etc...
    muestraCancelar();

    let cv = e.target,
        x = e.offsetX,
        y = e.offsetY,
        dim = cv.width / 20,
        fila = Math.floor(y / dim),
        columna = Math.floor(x / dim);

    // console.log(`Posicion: ${x} - ${y}`);

    // console.log(`Fila: ${fila} - columna: ${columna}`);

    if (x < 1 || x > cv.width - 1 || y < 1 || y > cv.height - 1){
        return;
    }

    let ctx = cv.getContext('2d'),
        //id = e.dataTransfer.getData('text/plain'),
        img1 = new Image();
        img2 = new Image();

    img1.src = 'fichaRoja.svg'; // document.getElementById(id).src
    img2.src = 'fichaVerde.svg';    

    //img.onload = function(){

        if(fila!=0 && columna!=0 && columna!=19){

            muestraDado();

            if((columna>=1 && columna<=9) && contFichasR<5){

                sessionStorage["ficha1y"] = fila;
                sessionStorage["ficha1x"] = columna;

                console.log(sessionStorage["ficha1y"] ,sessionStorage["ficha1x"]);

                ctx.drawImage(img1, columna * dim, fila * dim, dim, dim);

                console.log(columna*dim, fila*dim, dim, dim);

                contFichasR++;
                fichas1--;
                rellenaTeam1();
                // Destacar el cuadro con un cuadro rojo la ficha seleccionada 
                ctx.beginPath(); //evitar historias
                ctx.strokeStyle = '#f00';
                ctx.lineWidth = 2;
                ctx.strokeRect(columna * dim, fila * dim, dim, dim);

                botonPartida();
            }

            if((columna>=10 && columna<=18) && contFichasV<5){

                sessionStorage["ficha1y"] = fila;
                sessionStorage["ficha1x"] = columna;

                console.log(sessionStorage["ficha1y"] ,sessionStorage["ficha1x"]);

                ctx.drawImage(img2, columna * dim, fila * dim, dim, dim);
                contFichasV++;  
                fichas2--;
                rellenaTeam2();
                // Destacar el cuadro con un cuadro rojo la ficha seleccionada 
                ctx.beginPath(); //evitar historias
                ctx.strokeStyle = '#f00';
                ctx.lineWidth = 2;
                ctx.strokeRect(columna * dim, fila * dim, dim, dim);

                botonPartida();

            }

        }

        // Dibujo el campo de nuevo para eliminar el cuadro destacada de cada ficha

        dibujarCampoFutbol();

    //};

    //console.log(id);

}



/*function mouse_down(e){

    let cv = e.target,

        x = e.offsetX,

        y = e.offsetY,

        dim = cv.width / 20,

        fila = Math.floor(y / dim),

        columna = Math.floor(x / dim);



    //para todos los eventos hay que coger qué fila y columna hace el click

    console.log(`DOWN=>Fila: ${fila} - columna: ${columna}`);

    if (ficha.columna == columna && ficha.fila == fila) {

        //hay ficha

        cv.setAttribute('data-down', 'true'); //si el atributo existe, he hecho down

        console.log("he tocado ficha");



    }

}*/



/*function mouse_up(e){

    let cv = e.target,

        x = e.offsetX,

        y = e.offsetY,

        dim = cv.width / 20,

        fila = Math.floor(y / dim),

        columna = Math.floor(x / dim);



    //para todos los eventos hay que coger que fila y columna hace el click

    console.log(`UP=>Fila: ${fila} - columna: ${columna}`);



    cv.removeAttribute('data-down'); //sueltas la ficha, atributo fuera

}*/



// Index

//FUNCIONES TO WAPAS DEL MANU ESE
function checkform(){



     var f = document.forms["formEquipos"].elements;

        var cansubmit = true;

        if (f[0].value.length == 0 || f[1].value.length == 0) {

            cansubmit = false;

        }



        if (cansubmit) {

            document.getElementById('aJugarB').type = 'submit';

        }

        else{

            document.getElementById('aJugarB').type = 'hidden';   
        }
}


//rellena el formulario de index si se recarga la pagina

function rellenaForm(){

    if(sessionStorage['equipo1']!=null){
        document.forms["formEquipos"].elements[0].value=sessionStorage['equipo1'];
        document.forms["formEquipos"].elements[1].value=sessionStorage['equipo2'];
        document.getElementById('aJugarB').type = 'submit';
    }

}



// Almacena los nombres de los equipos en Session Storage

function guardarEquipos(frm){

    sessionStorage.clear();
    sessionStorage.setItem('equipo1', frm.elements.item(0).value);
    sessionStorage.setItem('equipo2', frm.elements.item(1).value);

}

 

function escribirEquipos(){
  document.getElementById("team1text").innerHTML = sessionStorage['equipo1'];
  document.getElementById("team2text").innerHTML = sessionStorage['equipo2'];
  //desactivar el dado si el estado es igual a 0
    //document.getElementsByTagName("BODY")[0].innerHTML = sessionStorage['equipo2'];
}



function muestraDado(){
  console.log("Dime que no entras por favor");
  console.log(sessionStorage['jugando']);
  if(sessionStorage['jugando']=='0'){
    document.getElementById("dado").style = "visibility:hidden";
  }else{
    document.getElementById("dado").style = "visibility:default";
  }

}



//lanza el dado y actualiza su imagen en el html

function lanzarDado(){

    var res = Math.floor(Math.random() * 6) + 1;

    switch(res){

        case 1:
            document.getElementById("imgDado").src = "dado1.png";
            document.getElementById("imgDado").alt = "1"; 
            break;

        case 2:
            document.getElementById("imgDado").src = "dado2.png";
            document.getElementById("imgDado").alt = "2"; 
            break;

        case 3:
            document.getElementById("imgDado").src = "dado3.png";
            document.getElementById("imgDado").alt = "3"; 
            break;

        case 4:
            document.getElementById("imgDado").src = "dado4.png";
            document.getElementById("imgDado").alt = "4"; 
            break;

        case 5:
            document.getElementById("imgDado").src = "dado5.png";
            document.getElementById("imgDado").alt = "5"; 
            break;

        case 6:
            document.getElementById("imgDado").src = "dado6.png";
            document.getElementById("imgDado").alt = "6"; 
            break;
    }

}



function rellenaTeam1(){

    if(fichas1==undefined){
        fichas1=5;
    }

    var writer = document.getElementById('fichasTeam1');
    var text = '';

    for(var i = 0; i<fichas1; i++){
        text += '<img src="fichaRoja.svg" id="'+ i +'" alt="Ficha Roja" class="ficha">';
    }
    writer.innerHTML = text;
}

function rellenaTeam2(){

    if(fichas2==undefined){
        fichas2=5;
    }
    console.log("entra");
    var writer = document.getElementById('fichasTeam2');
    var text = '';

    for(var i=0; i<fichas2;i++){
        text += '<img src="fichaVerde.svg" id="'+ (i+5) +'" alt="Ficha Verde" class="ficha">';
    }
   writer.innerHTML = text;
}



function botonPartida(){

    var botoncete = document.getElementById("empezarButton");

    if(sessionStorage['jugando']==0){
        if(contFichasR==5 && contFichasV==5){
            botoncete.type='button';
        }
        else{
            botoncete.type='hidden';
        }
    }
}



function empezarPartida(){
    //console.log("porque MIERDA ESTO NO VA");

    sessionStorage.setItem('jugando', '1');
    muestraCancelar();
    var botoncete = document.getElementById("empezarButton");

    botoncete.type='hidden';

    muestraDado();

    actualizaMarcador();

    document.getElementById("textoMarcador").style = 'visibility:initial';

    document.getElementById("marcador").style = 'visibility:initial';

    if(sessionStorage['jugando']=='1'){

        var text = 'Turno de '; 

        text += sessionStorage['equipo1'];

        document.getElementById("turnoDe").innerHTML = text;}

    else if(sessionStorage['jugando']=='2'){

        var text2 = 'Turno de ';

        text2 += sessionStorage['equipo2'];

        document.getElementById("turnoDe").innerHTML = text;
    }

    document.getElementById("banquillos").style = "display: none";

}



function actualizaMarcador(){

    var marcador = document.getElementById("marcador").firstElementChild;

    var texto = '';

    texto += sessionStorage['goles1'];

    texto += ' - ';

    texto += sessionStorage['goles2'];

    marcador.innerHTML= texto;

    document.getElementById("textoMarcador").style = 'visibility:initial';

    document.getElementById("marcador").style = 'visibility:initial';

}


function enableTurnoDe(){

     if(sessionStorage['jugando']=='1'){

        var text = 'Turno de '; 
        text += sessionStorage['equipo1'];
        document.getElementById("turnoDe").innerHTML = text;}

    else if(sessionStorage['jugando']=='2'){

        var text2 = 'Turno de ';
        text2 += sessionStorage['equipo2'];
        document.getElementById("turnoDe").innerHTML = text;}

}

function muestraCancelar(){
    console.log("muestraCancelar: " + sessionStorage['jugando']);
    var writer;
    var text;
    writer = document.getElementById("cancelaPartida");
    if(sessionStorage['jugando']=='0'){
        text = '';
    }

    else{
        text = '';
        text += '<button onclick="cancelarPartida();">Cancelar Partida</button>';
    }
    writer.innerHTML = text;

}

function cancelarPartida(){
    sessionStorage.clear();
    location.replace('index.html');
}

function lanzaMensajeEmergente(textoWapo){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),

        html = '';

    capa_fondo.appendChild(capa_frente);    

    html+= '<h2>';
    html+= textoWapo;
    html+= '</h2>';
    html+= '<button onclick="this.parentNode.parentNode.remove();">Cerrar</button>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    document.body.appendChild(capa_fondo);
}