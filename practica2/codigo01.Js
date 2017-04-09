//Para js utilizar comillas simples para evitar confusion
var idEntrada = 16;

function pedirEntrada(frm){
	
	/*
	//Sobrescribe el valor de la variable de arriba
 	var idEntrada = 6;
 	//let cuando se sale de la funcion esta variable se destruye, 
 	//este tipo de variables es temporal y no sobrescribe los valores
 	let idEntrada = 12;
*/

	//Se coge el valor del ide de la entrada
	let idEntrada = frm.id.value;
	console.log('hola' + idEntrada);

	let xhr = new XMLHttpRequest(), 
		//Ruta donde esta el rest de entrada en el ordenador http://localhost:4443/ph2/entrada.html
		url = 'http://localhost/practica2/rest/entrada/';
console.log('URL:'+ url + idEntrada)
	//Ultimo campo si quiero que sea sincrona o asincrona, esta parte es para inciar la peticion
	xhr.open('GET', url + idEntrada, true);

	
/*
	// Para los estados 2,3,4
	xhr.onreadystatechange = function(){
			//Si ha terminado el proceso
			console.log('readyState:' + xhr.readyState);
			if(xhr.readyState == 4){
				//Si es 200 quiere decir que el proceso se ha realizado con exito
				if(xhr.status == 200){
					//Aqui es donde tengo la respuesta del servidor
					let datosEntrada = xhr.responseText;
					console.log(datosEntrada)
					//Para poner los valores de los datosEntrada
					//innerHTML lo que hace es sustituir el elemneto que le seleccionamos mediante
					//querySelector y ponemos los valores.
					//frm.parentNode.querySelector('article>p').innerHTML = datosEntrada;
				}
			}
	};
*/
	//Es lo mimso que el metodo de arriba solo que se ejecuta cuando se ha realizado el status 200 y readyState 4
	//para la practica hacerlo asi
	xhr.onload = function(){
		let datosEntrada = xhr.responseText;
		console.log(datosEntrada)
		//frm.parentNode.querySelector('article>p').innerHTML = datosEntrada;
	};

//Se debe de poner vacio
	xhr.send();

	return false;
}


function hacerLogin(frm){
	

	let xhr = new XMLHttpRequest(), 
		
		url = 'http://localhost/practica2/rest/login/',


		login = frm.login.value,
		pwd = frm.pwd.value;
	

	xhr.open('POST', url, true);

	xhr.onload = function(){
		let datosUsuario = xhr.responseText;
		frm.parentNode.querySelector('article>p').innerHTML = datosUsuario;
	}


	let params = 'login=' + login + '&pwd=' + pwd;
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
	return false;
}