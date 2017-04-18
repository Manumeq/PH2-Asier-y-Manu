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
				html += 	'<h3><a href="entrada.html">' + e.nombre + '</a></h3>';
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
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		section = frm.document.body.getElementsByTagName("SECTION")[0];

	url += '?pag=' + 0 + '&lpag=' + 4; 

	xhr.open('GET', url, true);
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let html = '';

			for(let i=0; i<v.FILAS.length && i<6; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;

				html += '<article>';
				html += 	'<h3><a href="entrada.html">' + e.nombre + '</a></h3>';
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
				html += 		'<li><span aria-hidden="true" class="icon-calendar></span><time datetime="'+ e.fecha + '">' + e.fecha + '</time></li>';
				html += 	'</ul>';
				html += '</div>';
				html += '<div class="bodComentario">';
				html += 	'<h4 class="pSuspensivos">' + e.titulo + '</h4>';
				html += 	'<p>' + e.descripcion + '</p>';
				html += 	'<a href="entrada.html#incioComentarios"><p class="pSuspensivos"></p>' + e.nombre_entrada + '</a>';
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
				html += 	'</ul>';
				html += '</div>';
				html += '<div class="bodComentario">';
				html += 	'<h4 class="pSuspensivos">' + e.titulo + '</h4>';
				html += 	'<p>' + e.descripcion + '</p>';
				html += 	'<a href="entrada.html#incioComentarios"><p class="pSuspensivos"></p>' + e.nombre_entrada + '</a>';
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
	sessionStorage['du'].clear();
	
	// menu();

}