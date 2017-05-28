// Juego
function dibujarCampoFutbol(){
    let cv = document.getElementById('campo'),
        ctx = cv.getContext('2d'),
        dim = cv.width / 20;
    //console.log(dim);
    // fondo terreno
    ctx.beginPath();
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
    ctx.fill();
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

/*
function prepararDragnDropFichas(){
    // Zona Drag
    let v = document.querySelectorAll('body>img'),

    for(let i = 0; i< v.length; i++){
        v[i].setAttribute('draggable', 'true');
        v[i].id = 'img' + i;
        v[i].ondragstart = function(e){
            e.dataTransfer.setData('text/plain', v[i0.id]);
        }
    }

    // Zona drop
    let cv = document.getElementById('cv01');
}
*/

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
    sessionStorage.setItem('equipo1', frm.elements.item(0).value);
    sessionStorage.setItem('equipo2', frm.elements.item(1).value);
}
 
function escribirEquipos(){
  document.getElementById("team1text").innerHTML = sessionStorage['equipo1'];
  document.getElementById("team2text").innerHTML = sessionStorage['equipo2'];
    //document.getElementsByTagName("BODY")[0].innerHTML = sessionStorage['equipo2'];
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