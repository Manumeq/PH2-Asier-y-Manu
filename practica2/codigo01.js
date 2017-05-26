function cuadrado(){
	let cv = document.getElementById('cv01'),
		ctx = cv.getContext('2d');

	ctx.strokeStyle = 'red';
	ctx.lineWidth = 4;
	cts.fillStyle = 'blue';
	xtx.strokeRect(100, 100, 200, 101);
	ctx.fillRect(0, 0, 200, 100);

}

function rotar45deg(){
	let cv = document.getElementById('cv01'),
		ctx = cv.getContext('2d');

	ctx.translate(100, 100);
	ctx.rotate(45 * (Match.PI / 180));
}

function imagen(){
	let cv = document.getElementById('cv01'),
		ctx = cv.getContext('2d'),
		img = new Image();

		img.onload(){
			ctx.drawImage(img, 0, 0 ,cv.width, cv.heigth);
		};

		img.src = 'imgs/logo1.png';
}

function copiar(){
	let cv1 = document.getElementById('cv01'),
		ctx1 = cv1.getContext('2d'),
		cv2 = document.getElementById('cv02'),
		ctx2 = cv2.getContext('2d'),
		imgData;

	imgData = ctx1.getImageData(0, 0, cv1.width, cv2.heigth);
	ctx2.putImageData(imgData, 0, 0);
}