
function dibujarCampoFutbol(){
    let cv = document.getElementById('campo'),
        ctx = cv.getContext('2d'),
        dim = cv.width / 18;
    //console.log(dim);
    // Terreno de juego
    ctx.beginPath(); //para limpiar y que no se ponga todo del mismo color, tam, etc
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'green';
    for(let i = 0; i < 18; i++){

        if(i == -1 || i == 21){
            //ctx.moveTo();
        }else{
            //lineas verticales
            ctx.moveTo(dim * i, 0);
            ctx.lineTo(i * dim, cv.height);

            //lineas horizontales
            ctx.moveTo(0, dim * i);
            ctx.lineTo(cv.width, i * dim);
        }

    }

    ctx.rect(1, 1, cv.width - 1, cv.height - 1);
    ctx.rect(0, 0, cv.width - 1, cv.height - 1);
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
    ctx.arc(cv.width/4,cv.height/2,25,0,Math.PI);
    ctx.stroke();

    // Semicirculo área 2
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.arc(cv.width/3,cv.height/2,25,0,2*Math.PI);
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