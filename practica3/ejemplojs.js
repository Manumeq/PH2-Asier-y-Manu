function cuadrado(){
    let cv = document.getElementById('cv01'),
        ctx = cv.getContext('2d');

    ctx.strokeStyle = '#a00';
    ctx.lineWidth = 4;
    ctx.fillStyle = '#0aa';
    ctx.strokeRect(0,0,200,100);
    ctx.fillRect(0,0,200,100);
}

function rotar45deg(){
    let cv = document.getElementById('cv01'),
        ctx = cv.getContext('2d');

    ctx.translate(100,100);
    ctx.rotate( 45 * (Math.PI / 180));
}   

function imagen(){
    let cv = document.getElementById('cv01'),
        ctx = cv.getContext('2d'),
        img = new Image();

        img.onload = function(){
            ctx.drawImage(img,0,0,cv.width,cv.height);
        };
        img.src="st.jpg";
}

function copiar(){
    let cv1 = document.getElementById('cv01'),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.getElementById('cv02'),
        ctx2 = cv2.getContext('2d'),
        imgData;
               
    imgData = ctx1.getImageData(0,0,cv01.width,cv01.height);
    ctx2.putImageData(imgData,0,0);
}

function aColor(color){
    let cv1 = document.getElementById('cv01'),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.getElementById('cv02'),
        ctx2 = cv2.getContext('2d'),
        imgData;
    
    imgData = ctx1.getImageData(0,0,cv01.width,cv01.height);
    for(let i=0;i<imgData.height;i++){
        for(let j=0;j<imgData.width;j++){
//punto de inicio del pixel i,j debido a que cada pixel son 4 bytes
            if(color!='r')
                imgData.data[   (i * imgData.width + j) * 4 + 0] = 0; //ROJO   
            if(color!='g')
                imgData.data[   (i * imgData.width + j) * 4 + 1] = 0; //VERDE
            if(color!='b')
                imgData.data[   (i * imgData.width + j) * 4 + 2] = 0; //AZUL
            
            //imgData.data[(i * imgData.width + j) * 4 + 3] //ALPHA
        }
    }
}

function dibujarCuadricula(){
    let cv = document.getElementById('cv01'),
        ctx = cv.getContext('2d'),
        dim = cv.width/3;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00a';
    for(let i=1;i<=3;i++){
        ctx.moveTo(i * dim,0);
        ctx.lineTo(i * dim, cv.height);
        ctx.moveTo(0,i * dim);
        ctx.lineTo(cv.width, i * dim);
    }
    ctx.stroke();
}