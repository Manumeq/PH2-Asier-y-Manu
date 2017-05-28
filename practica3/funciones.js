
function dibujarCampoFutbol(){
    let cv = document.getElementById('campo'),
        ctx = cv.getContext('2d'),
        dim = cv.width / 20;
    //console.log(dim);
    // Terreno de juego
    ctx.beginPath(); //para limpiar y que no se ponga todo del mismo color, tam, etc
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'green';
    for(let i = 0; i <= 20; i++){

        if(dim*i != cv.height ){
            //lineas verticales
            ctx.moveTo(dim * i, 0);
            ctx.lineTo(i * dim, cv.height);

            //lineas horizontales
            ctx.moveTo(0, dim * i);
            ctx.lineTo(cv.width, i * dim);
        }
    }

    //ctx.rect(1, 1, cv.width - 1, cv.height - 1);
    //ctx.rect(0, 0, cv.width - 1, cv.height - 1);
    ctx.stroke(); //pintar;

    // Círculo central 
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.arc(cv.width/2,cv.height/2,25,0,2*Math.PI);
    ctx.stroke();

    // Semicirculo área 1
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.arc(cv.width/4,cv.height/2,25,1.5*Math.PI,0.5*Math.PI);
    ctx.stroke();

    // Semicirculo área 2
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.arc(cv.width/1.25,cv.height/2,25,0.5*Math.PI,1.5*Math.PI);
    ctx.stroke();

    // Líneas de banda
    /*ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.moveTo(0, 0);
    ctx.lineTo(0, cv.width);
    ctx.stroke();*/

    // Línea central
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.moveTo(cv.width/2, 0);
    ctx.lineTo(cv.width/2, cv.height);
    ctx.stroke();



}

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

//Almacena los nombres de los equipos en Session Storage
function guardarEquipos(frm){
    sessionStorage.setItem('equipo1', frm.elements.item(0).value);
    sessionStorage.setItem('equipo2', frm.elements.item(1).value);
}

function escribirEquipos(frm){
  //document.getElementsByTagName("BODY")[0].innerHTML = sessionStorage['equipo2'];
}