function hacerLogin(frm){

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/login/'; //Preguntar porque NO FUNCIONA el servidor
		fd = new FormData(frm);

	xhr.open('POST', url, true);

	//ONLOAD SE DISPARA CUANDO YA HEMOS RECIBIDO LA PETICION Y TENEMOS EL RESULTADO
	xhr.onload = function(){
		console.log(xhr.responseText);
		let du = JSON.parse(xhr.responseText);
		
		if (du.RESULTADO == 'ok'){
			//GUARDAMOS EN EL SESSION STORAGE
			sessionStorage['du'] = xhr.responseText;
		}else{
			frm.parentNode.querySelector('p').textContent = xhr.responseText;
		}
			
	};

	xhr.send(fd);

	return false;
}

function mostrarFoto(inp) {
	let fr = new fileReader(); // let es igual a var pero lo hace a nivel local y cuando se sale de la funcion deja de tener valor

	fr.onload = function(){
		inp.parentNode.querySelector('img').src = fr.result;
		inp.parentNode.querySelector('img').alt = inp.files[0].name;
	}

	fr.readAsDataURL(inp.files[0]);
}

function enviarFoto(this){
	let xhr = new XMLHRequest(),
		url = 'ruta de la foto',
		fd = new FormData(),
		du = JSON.parse(sessionStorage['du']);

	fd.append('login');
	fd.append('id_enrada', 1);
	fd.append('descripcion', btn.parentNode.querySelector('textarea').value);
	fd.append('foto', btn.parentNode.querySelector('[type=file]').file[0]);

	xhr.open('POST', url, true);
	xhr.onload = function(){
		console.log(xhr.responseText);
	};
	xhr.setRequestHeader('Authorization', du.clave);
	xhr.send(fd);
}