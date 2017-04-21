if(sessionStorage['pointer']==undefined){
	sessionStorage['pointer'] = 0;
}

function cargarEntrada(entrada){ //ENTRADA ES EL THIS
	console.log('ENTRA');
	let idEntrada = entrada.id;

	let xhr = new XMLHttpRequest(),
	url = 'http://localhost/PHII/practica2/rest/entrada/';
	
	console.log('URL: ' + url + idEntrada);

	xhr.open('GET', url + idEntrada, true);

	xhr.onload = function(){
			let datosEntrada = xhr.responseText;
			console.log(datosEntrada)
			//frm.parentNode.querySelector('article>p').innerHTML = datosEntrada;
		};

	//Se debe de poner vacio
		xhr.send();



	return false;
}




// Nueva funcion de prueba para mostrar las entradas cogido del ejemplo_11 (probando el primer ejemplo)
function mostrarEntradas(frm){
	pageText = 'Página ' + frm.pag.value;

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		section = frm.parentNode.parentNode;

	url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value; 

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let html = '';

			for(let i=0; i<v.FILAS.length && i<6; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;

				html += '<article>';
				html += 	'<h3><a href="entrada.html/?id=' + e.id + '">' + e.nombre + '</a></h3>';
				html += 	'<figure>';
				html += 		'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 		'<figcaption>' + e.descripcion + '<footer><a>Ver más</a></footer></figcaption>';
				html += 	'</figure>';
				html += 	'<footer>';
				html += 	'<ul>';
				html += 		'<li><span aria-hidden="true" class="icon-comment"></span>' + e.ncomentarios + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-picture"></span>' + e.nfotos + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-calendar"></span><time datetime="'+ e.fecha + '">' + e.fecha + '</time></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>';
				html += 	'</ul>';
				html += 	'</footer>';
				html += '</article>';

			}//for(let i=0; i<v.FILAS.length; i++)
			section.querySelector('h2+div').innerHTML = html;
		}
	}

	xhr.send();

	return false;
}

function mostrarEntradasDefault(frm){
	console.log(frm.document.body.getElementsByTagName("SECTION")[0]);
	console.log(sessionStorage['pointer']);
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		section = frm.document.body.getElementsByTagName("SECTION")[0];

	url += '?pag=' + sessionStorage['pointer'] + '&lpag=' + 4; 
	xhr.open('GET', url, true);
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let html = '';

			for(let i=0; i<v.FILAS.length && i<6; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;

				html += '<article>';
				html +=   '<h3><a href="entrada.html?id=' + e.id + '">' + e.nombre + '</a></h3>'; 
				html += 	'<figure>';
				html += 		'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 		'<figcaption>' + e.descripcion + '<footer><a>Ver más</a></footer></figcaption>';
				html += 	'</figure>';
				html += 	'<footer>';
				html += 	'<ul>';
				html += 		'<li><span aria-hidden="true" class="icon-comment"></span>' + e.ncomentarios + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-picture"></span>' + e.nfotos + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-calendar"></span><time datetime="'+ e.fecha + '">' + e.fecha + '</time></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>';
				html += 	'</ul>';
				html += 	'</footer>';
				html += '</article>';

			}//for(let i=0; i<v.FILAS.length; i++)
			section.querySelector('h2+div').innerHTML = html;

		}
	}

	xhr.send();

	return false;
}

/* MODIFICACIONES DE MANU*/
function mostrarEntradaId(frm, id){ //MUESTRA UNA ENTRADA CONCRETA POR ID
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/' + id;
		section = frm.document.body.getElementsByTagName("SECTION")[0]; //Seccion datos de entrada
		

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
		//<-----DATOS DE LA ENTRADA-------->
			let html = '';
			let e = v.FILAS[0];

			html += '<h2>Datos de la entrada</h2>';
			html +=	'<fieldset id="infEntrada">';
			html += 	'<ul>';
			html += 		'<li>';
			html += 			'<span aria-hidden="true" class="icon-calendar">';
			html += 			'Fecha de alta: ' + e.fecha + '</span>';
			html += 		'</li>';
			html +=			'<li>';
			html +=				'<p>' + e.descripcion + '</p>';
			html +=			'</li>';
			html +=			'<li>';
			html +=				'<a href="#fotosEntrada"><span aria-hidden="true"' +
									'class="icon-picture"> Numero de fotos: ' + e.nfotos + '</span>';
			html +=				'</a>';
			html +=			'</li>';
			html +=			'<li>';
			html +=				'<a href="#comentariosEntrada"><span aria-hidden=' +
								'"true" class="icon-comment"></span>Numero de comentarios de' +
								'los usuarios: ' + e.ncomentarios + '</a>';
			html +=			'</li>';
			html +=			'<li>';
			html +=				'<span aria-hidden="true" class="icon-user">';
			html +=				'Autor: ' + e.login + '</span>';	 		
			html +=			'</li>';
			html +=		'</ul>';
			html +=	'</fieldset>';
			section.innerHTML = html;
			
		}
	}
	xhr.send();

	let xhr2 = new XMLHttpRequest(),
		url2 = 'http://localhost/PHII/practica2/rest/entrada/' + id + '/fotos';
		section2 = frm.document.body.getElementsByTagName("SECTION")[1]; //Seccion fotos de entrada
		


	xhr2.open('GET', url2, true);

	xhr2.onload = function(){
		let v2 = JSON.parse(xhr2.responseText);
		if(v2.RESULTADO == 'ok'){
			
			html = '';
			html += '<h2>Fotografías Entrada</h2>';
			html += '<div>';
			for(let i=0; i<v2.FILAS.length; i++){
				let e = v2.FILAS[i],
					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;
					console.log(e);
			//<-------FOTOS DE LA ENTRADA-------->
			
				
				html += '<article>';
				html += '<h3>Fotografía ' + e.id + '</h3>';
				html += '<figure class="fotoEntrada">';
				html +=		'<img src="' + foto + '" alt="' + e.texto + '"/>';
				html += '</figure>';
				html +=	'<p>' + e.texto + '</p>'; 
				html += '</article>';
				
			}
			html += '</div>';
			section2.innerHTML = html;
		}
	}
	xhr2.send();


	let xhr3 = new XMLHttpRequest(),
		url3 = 'http://localhost/PHII/practica2/rest/entrada/' + id + '/comentarios';
		section3 = frm.document.body.getElementsByTagName("SECTION")[2]; //Seccion comentarios de la entrada
		
	xhr3.open('GET', url3, true);

	xhr3.onload = function(){
		let v3 = JSON.parse(xhr3.responseText);
		if(v3.RESULTADO == 'ok'){
			html = '';
			html += '<h2>Comentarios</h2>';
			
			for(let i=0; i<v3.FILAS.length && i<10; i++){
				let e = v3.FILAS[i];
				answer = 'RE: ' + e.titulo;

			html += '<section>';
			//<-------COMENTARIOS DE LA ENTRADA-------->			
				
				html += '<div class="cabComentario">';
				html += 	'<ul>';
				html += 		'<li><span><img src="imgs/user1.jpg" alt="' + e.login + '"></span></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-calendar"></span> <time = datetime="' + e.fecha + '">' + e.fecha + '</time> </li>';
				html += 		'<li><a href="#responder" onclick="rellenaForm(answer)"><button>Responder</button></a></li>';
				html += 	'</ul>';
				html += '</div>';
				html +=	'<div class="bodComentario">';
				html += 	'<h4 class="pSuspensivos">' + e.titulo + '</h4>';
				html +=		'<p>' + e.texto + '</p>';
				html +=	'</div>';
			html += '</section>';
			}
			
			section3.innerHTML = html;
		}
	}
	xhr3.send();

	return false;
}

function getID(){
	var $_GET = {};
	if(document.location.toString().indexOf('?') !== -1) {
	    var query = document.location
	                   .toString()
	                   // get the query string
	                   .replace(/^.*?\?/, '')
	                   // and remove any existing hash string (thanks, @vrijdenker)
	                   .replace(/#.*$/, '')
	                   .split('&');

	    for(var i=0, l=query.length; i<l; i++) {
	       var aux = decodeURIComponent(query[i]).split('=');
	       $_GET[aux[0]] = aux[1];
	    }
	}

	return $_GET['id'];
}

function prevPage(){
	if(sessionStorage['pointer']>0){
		sessionStorage['pointer']--;
	}
}

function nextPage(){
		sessionStorage['pointer']++;
}

function rellenaForm(Answer){ //rellena el formulario de respuesta de comentario con los datos recibidos por parametro
	//console.log(document.getElementById("tituloComentario"));
	var text = document.getElementById("tituloComentario").setAttribute("value", Answer);
}

function numPag(frm){
	frm.document
}

/* FIN DE MODIFICACIONES DE MANU*/


function mostrarComentarios(frm){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/comentario/';
		section = frm.parentNode.parentNode; // ASIER - NO SE PARA QUE sirve


	url += '?u=10'; // + frm.pag.value + '&lpag=' + frm.lpag.value; 

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let html = '';

			for(let i=0; i<v.FILAS.length && i<10; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/imgs/user1.jpg';

				html += '<div class="cabComentario">';
				html += 	'<ul>';
				html += 		'<li><span><img src="' + foto + '"></span></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>';
				html += 		'<h3><li><a href="entrada.html#incioComentarios"><p class="pSuspensivos">' + e.nombre_entrada + '</p></a></h3>';
				html += 		'<li><span aria-hidden="true" class="icon-calendar></span><time datetime="'+ e.fecha + '">' + e.fecha + '</time></li>';
				html += 	'</ul>';
				html += '</div>';
				html += '<div class="bodComentario">';
				html += 	'<h4 class="pSuspensivos">' + e.titulo + '</h4>';
				html += 	'<p>' + e.texto + '</p>';
				html += '</div>';

			}//for(let i=0; i<v.FILAS.length; i++)
			section.querySelector('h2+section').innerHTML = html;
		}
	}

	xhr.send();

	return false;
}

function mostrarComentariosDefault(frm){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/comentario/';
		section = frm.document.body.getElementsByTagName("SECTION")[2] // ASIER - NO SE PARA QUE sirve
		console.log(section);

	url += '?u=10'; // + frm.pag.value + '&lpag=' + frm.lpag.value; 

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let html = '';

			for(let i=0; i<v.FILAS.length && i<10; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/imgs/user1.jpg';

				html += '<div class="cabComentario">';
				html += 	'<ul>';
				html += 		'<li><span><img src="' + foto + '"></span></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>'; 		
				html += 		'<li><span aria-hidden="true" class="icon-calendar></span><time datetime="'+ e.fecha + '">' + e.fecha + '</time></li>';
				html += 		'<li><h3><a href="entrada.html?id=' + e.id_entrada + '"><p class="pSuspensivos">' + e.nombre_entrada + '</p></a></h3></li>';
				html += 	'</ul>';
				html += '</div>';
				html += '<div class="bodComentario">';
				html += 	'<h4 class="pSuspensivos">' + e.titulo + '</h4>';
				html += 	'<p>' + e.texto + '</p>';
				html += '</div>';

			}//for(let i=0; i<v.FILAS.length; i++)
			section.querySelector('h2+section').innerHTML = html;
		}
	}

	xhr.send();

	return false;
}



function hacerLogin(frm){

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/login/',
		fd = new FormData(frm); // le pasamos al constructor la referencia al formulario

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
			var fecha_acceso = du.ultimo_acceso;

			// Luego sacar el mensaje de login correcto
			mostrarMensajeLoginCorrecto(fecha_acceso);
		}else{
			// Si es error, es decir, no es 'ok', hacemos que se muestre un mensaje emergente
			// avisando que lo volvamos a intentar
			mostrarMensajeLoginIncorrecto();
			//frm.parentNode.querySelector('article').textContent = xhr.responseText; // textContent o innerHtml
			// textContent no interpreta html sino texto. innerHtml interpreta el html.
		}
			
	};

	xhr.send(fd); // Enviamos el FormData

	return false;
}

// Función para mostrar el mensaje emergente cuando no se ha 
// podido iniciar sesión.
function mostrarMensajeLoginIncorrecto(){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        //texto = document.querySelector('body>input[name="mensaje"]').value,

        html = '';

    capa_fondo.appendChild(capa_frente);    

    html+= '<h2>Login Incorrecto</h2>';
    html+= '<a href="login.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    document.body.appendChild(capa_fondo);
}

// Función para mostrar el mensaje emergente cuando se
// ha podido iniciar inicar sesión correctamente
function mostrarMensajeLoginCorrecto(fecha_acceso){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        //texto = document.querySelector('body>input[name="mensaje"]').value,

        html = '';

    capa_fondo.appendChild(capa_frente);    

    html+= '<h2>Login Correcto</h2>';
    html+= '<p>Bienvenido a nuestra web</p>';
    html+= '<p>Último acceso: ' + fecha_acceso + '</p>';
    html+= '<a href="index.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    document.body.appendChild(capa_fondo);
}

// Función para mostrar dos menús distintos en función si
// hemos iniciado sesion o no.
function menu(){
  let html = '';
  if (sessionStorage['du']!=null){

    html += '<ul>';
    html +=   '<li><label for="ckb-menu"><span aria-hidden="true" class="icon-menu"></span></label></li>';
    html +=   '<li><a href="index.html"><span aria-hidden="true" class="icon-home"></span>Home</a></li>';
    html +=   '<li><a href="buscar.html"><span aria-hidden="true" class="icon-search"></span>Buscar</a></li>';
    html +=   '<li><a href="nueva-entrada.html"><span aria-hidden="true" class="icon-doc-new"></span>Nueva Entrada</a></li>';
    html +=   '<li><a onclick="hacerlogout();" href="index.html"><span aria-hidden="true" class="icon-logout"></span>Logout</a></li>';
    html += '</ul>';
    document.querySelector('body>nav').innerHTML = html;

  }else{

    html += '<ul>';
    html +=   '<li><label for="ckb-menu"><span aria-hidden="true" class="icon-menu"></span></label></li>';
    html +=   '<li><a href="index.html"><span aria-hidden="true" class="icon-home"></span>Home</a></li>';
    html +=   '<li><a href="buscar.html"><span aria-hidden="true" class="icon-search"></span>Buscar</a></li>';
    html +=   '<li><a href="login.html"><span aria-hidden="true" class="icon-login"></span>Login</a></li>';
    html +=   '<li><a href="registro.html"><span aria-hidden="true" class="icon-edit"></span>Registro</a></li>';
    html += '</ul>';
    document.querySelector('body>nav').innerHTML = html;
  }
}

// Función para cerrar la sesión actual
function hacerlogout(){
	sessionStorage.clear();
}

// Función para registrar a un nuevo usuario
function hacerRegistro(frm){

	//console.log('funciona');

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/usuario/',
		fd = new FormData();


	
	var login_value = frm.parentNode.querySelector('input[name=login]').value;				
	var nombre_value = frm.parentNode.querySelector('input[name=nombre]').value;
	var pwd_value = frm.parentNode.querySelector('input[name=pwd]').value;
	var pwd2_value = frm.parentNode.querySelector('input[name=pwd2]').value;
	var email_value = frm.parentNode.querySelector('input[name=email]').value;



	/*Pruebas*/	
	/*
	console.log(a);
	console.log(s);
	console.log(d);
	console.log(f);
	console.log(g);
	*/

	
	

	xhr.open('POST', url, true);
	xhr.onload = function(){
		console.log(xhr.responseText);
		let du = JSON.parse(xhr.responseText);

		if(du.RESULTADO == 'error' && du.DESCRIPCION == 'Login no válido, ya está en uso.'){
			console.log("entra login incorrecto");

			// Mostrar un mensaje en rojo al lado del login
			// indicandole al usuario que el login ya está en uso
			alert("Login ya está en uso, introcude otro");

		}else{
			if(du.RESULTADO == 'error' && du.DESCRIPCION == 'Contraseñas distintas'){
				console.log("entra constraseñas distintas");

				// Mostrar un mensaje en rojo al lado de la contraseña
				// indicando que no ha repetido la misma contraseña
				alert("Constraseñas distintas");
			}
		}
	};

	fd.append('login', login_value);
	fd.append('nombre', nombre_value);
	fd.append('pwd', pwd_value);
	fd.append('pwd2', pwd2_value);
	fd.append('email', email_value);

	xhr.send(fd);

	return false;
}


function hacerLogin(frm){

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/login/',
		fd = new FormData(frm); // le pasamos al constructor la referencia al formulario

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
			var fecha_acceso = du.ultimo_acceso;

			// Luego sacar el mensaje de login correcto
			mostrarMensajeLoginCorrecto(fecha_acceso);
		}else{
			// Si es error, es decir, no es 'ok', hacemos que se muestre un mensaje emergente
			// avisando que lo volvamos a intentar
			mostrarMensajeLoginIncorrecto();
			//frm.parentNode.querySelector('article').textContent = xhr.responseText; // textContent o innerHtml
			// textContent no interpreta html sino texto. innerHtml interpreta el html.
		}
			
	};

	xhr.send(fd); // Enviamos el FormData

	return false;
}

/*PETICIONES AJAX entradas*/

/*
■ rest/entrada/?u={número}
Devuelve las últimas (número) entradas más recientes.
■ rest/entrada/?n={texto}
Devuelve las entradas que tengan la subcadena t exto en el nombre.
■ rest/entrada/?d={texto}
Devuelve las entradas que tengan la subcadena t exto en la
descripción .
■ rest/entrada/?l={login}
Devuelve las entradas creadas por el usuario login .
■ rest/entrada/?fi={aaaa-mm-dd}
Devuelve las entradas cuya fecha sea posterior a la fecha fi .
■ rest/entrada/?ff={aaaa-mm-dd}
Devuelve las entradas cuya fecha sea anterior a la fecha ff .
■ rest/entrada/?pag={pagina}&lpag={registros_por_pagina}
*/

// Función que realiza la busqueda
function realizarBusqueda(){

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		fd = new FormData(frm),
		section = frm.parentNode.parentNode;


	xhr.open('POST', url, true);



	return false;
}