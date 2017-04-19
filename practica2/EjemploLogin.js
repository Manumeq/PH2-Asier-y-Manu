function hacerLogin(frm){

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/login/',
		fd = new FormData(frm); // le pasamos al constructor  la referencia al formulario

		// El FormData accederá e ese formulario y todos los campos input
		// que tengan name cogerán su valor e irá encapsulando esa lista de pares nombre/valor

	xhr.open('POST', url, true); // Metodo POST por temas de seguridad, o porque no queremos modificar la base de datos


	//ONLOAD SE DISPARA CUANDO YA HEMOS RECIBIDO LA PETICION Y TENEMOS EL RESULTADO
	xhr.onload = function(){
		console.log(xhr.responseText);
		let du = JSON.parse(xhr.responseText);
		
		if (du.RESULTADO == 'ok'){
			//GUARDAMOS EN EL SESSION STORAGE
			// Ya tendriamos toda la informacion del usuario
			sessionStorage['du'] = xhr.responseText; // Guardar toda la información que nos devuelva el servidor
			// Luego sacar el mensaje de login correcto
		}else{
			// Si es error, es decir, no es 'ok', hacemos que se muestre un mensaje emergente
			// avisando que lo volvamos a intentar
			frm.parentNode.querySelector('p').textContent = xhr.responseText; // textContent o innerHtml
			// textContent no interpreta html sino texto. innerHtml interpreta el html.
		}
			
	};

	xhr.send(fd); // Enviamos el FormData

	return false;
}

function mostrarFoto(inp) {

	// let es igual a var pero lo hace a nivel local y cuando se sale de la funcion deja de tener valor
	let fr = new fileReader(); 

	fr.onload = function(){
		inp.parentNode.querySelector('img').src = fr.result;
		inp.parentNode.querySelector('img').alt = inp.files[0].name;
	}

	fr.readAsDataURL(inp.files[0]);
}

function enviarFoto(btn){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/foto/',
		fd = new FormData(),
		du = JSON.parse(sessionStorage['du']);

	fd.append('login', du.login);
	fd.append('id_entrada', 1);
	fd.append('texto', btn.parentNode.querySelector('textarea').value);
	fd.append('foto', btn.parentNode.querySelector('[type=file]').file[0]);

	xhr.open('POST', url, true);
	xhr.onload = function(){
		console.log(xhr.responseText);
	};
	xhr.setRequestHeader('Authorization', du.clave);
	xhr.send(fd);
}