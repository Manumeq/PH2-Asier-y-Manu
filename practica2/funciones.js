var first;
var section;
var pagmax;
var pagaux1;
var pagaux2;

if(sessionStorage['pointer']==undefined){
	sessionStorage['pointer'] = 0;

}

firstpointer=0;
var lastpointer=0;

if(sessionStorage['maxpointer']==undefined){
	sessionStorage['maxpointer']=0;
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
			sessionStorage['maxpointer'] = v.FILAS.length/6;
			for(let i=0; i<v.FILAS.length && i<6; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;

				html += '<article>';
				html += 	'<h3><a href="entrada.html/?id=' + e.id + '">' + e.nombre + '</a></h3>';
				html += 	'<figure>';
				html += 		'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 		'<figcaption>' + e.descripcion + '<footer><a href="entrada.html?id=' + e.id + '">Ver más</a></footer></figcaption>';
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

function maxPageCalc(){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PH2/Practica2/rest/entrada/',
		pagaux1=0;
	xhr.open('GET', url, true);
	//Cuando es get no se pasa nada por parametros, se concatena con la url
	//url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value;
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);

		if(v.RESULTADO == 'ok'){
			pagmax=v.FILAS.length;
			console.log("Numero de entradas: "+pagmax);
			pagaux1=pagmax/3;
			sessionStorage['maxpointer']=parseInt(pagmax/6);
			lastpointer = parseInt(pagmax/6);
			if(pagaux1>pagaux2){
				sessionStorage['maxpointer']=pagaux2+1;
				lastpointer = pagaux2+1;
			}
			console.log("Paginas totales: "+pagaux2);
		}
	};
	xhr.send();
}

function mostrarEntradasDefault(frm){
	console.log(frm.document.body.getElementsByTagName("SECTION")[0]);
	console.log(sessionStorage['pointer']);
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		section = frm.document.body.getElementsByTagName("SECTION")[0];

	url += '?pag=' + sessionStorage['pointer'] + '&lpag=' + 6; 
	xhr.open('GET', url, true);
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			if(v.FILAS.length>=6){
				console.log("entras: " + v.RESULTADO.length);
				//sessionStorage['maxpointer'] = v.RESULTADO.length;
				//console.log("esta asignatura es una puta mierda: " + sessionStorage['maxpointer']);
				//lastpointer = Math.floor(v.RESULTADO.length);
			}
			else{
				
				//sessionStorage['maxpointer'] = 0;
			}
			let html = '';

			for(let i=0; i<v.FILAS.length; i++){
				console.log(v.FILAS.length);
				let e = v.FILAS[i],
					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;
				
				html += '<article>';
				html +=   '<h3><a href="entrada.html?id=' + e.id + '">' + e.nombre + '</a></h3>'; 
				html += 	'<figure>';
				html += 		'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 		'<figcaption>' + e.descripcion + '<footer><a href="entrada.html?id=' + e.id + '">Ver más</a></footer></figcaption>';
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
			
			section = frm.document.getElementById("contpag");
			var suma = (parseFloat(sessionStorage['pointer']) + 1); // SI, EFECTIVAMENTE HACE FALTA PORQUE JAVASCRIPT
			section.innerHTML = 'Página ' + suma + ' de ' + sessionStorage['maxpointer']; 
			console.log("section: " + section);

		}
	}

	xhr.send();

	return false;
}

/* MODIFICACIONES DE MANU*/

function comprobarPaginaEntrada(id){
	if(id==null || id==''){
		location.replace('index.html');
	}
}

function mostrarEntradaId(frm, id){ //MUESTRA UNA ENTRADA CONCRETA POR ID

	// ASIER MODIFICADO
	// console.log(id);
	comprobarPaginaEntrada(id);
	// Termina Modificación Asier

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
			//html += '<h2>Comentarios</h2>';
			
			for(let i=0; i<v3.FILAS.length && i<10; i++){
				let e = v3.FILAS[i];
				answer = 'RE: ' + e.titulo;
				console.log(answer);

				html += '<section>';
				//<-------COMENTARIOS DE LA ENTRADA-------->			
					
				html += '<div class="cabComentario">';
				html += 	'<ul>';
				html += 		'<li><span><img src="imgs/user1.jpg" alt="' + e.login + '"></span></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-calendar"></span> <time = datetime="' + e.fecha + '">' + e.fecha + '</time> </li>';
				html += 		'<li><a href="#textComentario"><button onclick="rellenaForm(\''+answer+'\');">Responder</button></a></li>'; // IMportante pasar por parametro de esta forma a la funcion
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


function firstPage(){
	sessionStorage['pointer'] = firstpointer;
}

function prevPage(){
	if(sessionStorage['pointer']>0){
		sessionStorage['pointer']--;
		mostrarEntradasDefault(section);
	}
}

function nextPage(){
	if(sessionStorage['pointer']<sessionStorage['maxpointer'])
		sessionStorage['pointer']++;
		mostrarEntradasDefault(section);
}

function lastPage(){
	sessionStorage['pointer'] = parseFloat(sessionStorage['maxpointer']) -1 ;
}

/** NUEVA ENTRADA* */
function nuevaFotoEntrada(frm){
	//console.log(frm);
	var test = frm.parentNode.firstChild.nextSibling.nextSibling.nextSibling;
	if(first==undefined){
		test.innerHTML = '';
		first = false;
	}
	
	newPic = '';
	newPic += '<article>';
	newPic += 	 '<div>';
	newPic += 		'<img src="imgs/imagen_no_disponible.jpg" alt="No hay imagen" onclick="this.parentNode.querySelector(&quot;[type=file]&quot;).click();" class="n-entrada-img">';
	newPic += 		'<textarea placeholder="descripcion aquí"></textarea>';
	newPic +=		'<span></span>';
	newPic +=		'<input type="file" multiple accept="image/*" onchange="mostrarFoto(this); comprobarTamanyo(this);"/>';
	/*newPic +=		'<input type="file" accept="image/*" onchange="mostrarFoto(this); comprobarTamanyo(this);">';*/
	newPic +=	 '</div>';
	newPic += 	'<button type="button" id="delFoto" onclick="borrarFotoEntrada(this);"> Eliminar Foto </button>';
	newPic += '</article>';
	
	//console.log(test);
	test.innerHTML += newPic;
	
	//document.getElementsByTagName("h2")[3].innerHTML = html;		
}

function comprobarTamanyo(input){
	var parent;
	parent = input.parentNode;
	parent = parent.firstChild;
	console.log(parent);
	input = input.files[0];
	 
	if(input.size>512000){
		parent.setAttribute("style", "border: solid 3px red;");
		parent = parent.nextSibling;
		parent = parent.nextSibling;
		parent.innerHTML= 'Vamos a ver Javier, ¿tú que parte de 500 kb no has entendido?';
		parent.setAttribute("style", "color:red;");
	}
	else{
		parent.setAttribute("style", "");
		parent = parent.nextSibling;
		parent = parent.nextSibling;
		parent.innerHTML= '';
	}

}

//borra la foto de la entrada obteniendo su padre (article) a partir del boton "Eliminar Foto" que la llama. Después borra el código HTML de dicho article
function borrarFotoEntrada(frm){
	var foto = frm.parentNode;
	foto.innerHTML='';
}

function mostrarFoto(inp) {

	// let es igual a var pero lo hace a nivel local y cuando se sale de la funcion deja de tener valor
	var fr = new FileReader(); 

	fr.onload = function(){
		inp.parentNode.querySelector('img').src = fr.result;
		inp.parentNode.querySelector('img').alt = inp.files[0].name;
	};

	fr.readAsDataURL(inp.files[0]);
}

function enviarEntrada(btn){


	let foto = document.querySelectorAll('[type=file]');
	console.log(foto);
	
	let tamanyo_grande = false;

	for(var i=0; i<foto.length; i++){
		
		let article = foto[i].parentNode.parentNode;
		console.log(article);

		// Ponemos esta primera condicin porque si se añaden más fotos
		// a la entrada, se ponen como undefined y entonces no se podría
		// sacar el tamaño del input file del article y no se mostraría
		// nada por consola y no haría nada.
		if(article.querySelector('[type=file]').files[0] != undefined){ 

			if(article.querySelector('[type=file]').files[0].size > 512000){
				tamanyo_grande = true;
			}
		}					

	}

	if(tamanyo_grande == false){

		let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		fd = new FormData(),
		du = JSON.parse(sessionStorage['du']);

		//console.log(btn);
		fd.append('login', du.login);
		fd.append('nombre', btn.parentNode.querySelector('[type=text]').value);
		fd.append('descripcion', btn.parentNode.querySelector('textarea').value);

		xhr.open('POST', url, true);
		xhr.onload = function(){
			console.log(xhr.responseText);
			let v = JSON.parse(xhr.responseText);

			if(v.RESULTADO == 'ok'){
				enviarFoto(v.id);
				mostrarMensajeEntradaCorrecta();
			}

		};
		xhr.setRequestHeader('Authorization', du.clave);
		xhr.send(fd);

		return false;
	}else{
		alert("Las fotos no deben superar los 500KB");
	}
	// return false;
}


function enviarFoto(id_entrada){

	let xhr = new XMLHttpRequest(),
			url = 'http://localhost/PHII/practica2/rest/foto/',
			form = new FormData(),
			du = JSON.parse(sessionStorage['du']);

	let foto = document.querySelectorAll('[type=file]');
	console.log(foto);
	
	for(var i=0; i<foto.length; i++){
		
		
		let article = foto[i].parentNode.parentNode;
		console.log(article);

		console.log(article.querySelector('[type=file]').files[0]);
		console.log(article.querySelector('textarea').value);

		form.append('login', du.login);
		form.append('id_entrada', id_entrada);
		form.append('texto', article.querySelector('textarea').value);
		form.append('foto', article.querySelector('[type=file]').files[0]);

		//console.log(form.get("foto"));

		xhr.open('POST', url, true);
		xhr.onload = function(){
			console.log(xhr.responseText);
			console.log("entra");
		};

		xhr.setRequestHeader('Authorization', du.clave);
		xhr.send(form);

		// Reiniciamos el xhr y el FormData
		form = new FormData();
		xhr = new XMLHttpRequest();

	}			
}

// Función para mostrar el mensaje emergente cuando se
// ha enviado la entrada correctamente.
function mostrarMensajeEntradaCorrecta(){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),

        html = '';

    capa_fondo.appendChild(capa_frente);    

    html+= '<h2>Entrada realizada correctamente</h2>';
    html+= '<a href="login.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    document.body.appendChild(capa_fondo);
}

/** TERMINA NUEVA ENTRADA **/

function rellenaForm(Answer){ //rellena el formulario de respuesta de comentario con los datos recibidos por parametro
	//console.log(document.getElementById("tituloComentario"));
	console.log(Answer);

	//document.getElementById("tituloComentario").innerHTML = Answer;

	var text = document.getElementById("tituloComentario").setAttribute("value", Answer);
}

function numPag(frm){
/*
	mysection = frm.document.body.getElementsByTagName("SECTION")[1];
	mysection = mysection.getElementsByTagName("UL")[0];
	mysection = mysection.getElementsByTagName("LI")[2];

	myhtml = '';
	myhtml += 'Página ';
	myhtml += sessionStorage['pointer'];
	myhtml += ' de ';
	myhtml += sessionStorage['maxpointer'];

	mysection.innerHTML = myhtml;

	console.log(mysection);
*/	
}

/* FIN DE MODIFICACIONES DE MANU*/

function mostrarComentarios(frm){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/comentario/';
		section = frm.parentNode.parentNode;


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
		section = frm.document.body.getElementsByTagName("SECTION")[2]
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
				console.log(e.id);
				html += '<div class="cabComentario">';
				html += 	'<ul>';
				html += 		'<li><span><img src="' + foto + '" alt="foto_perfil"></span></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>'; 		
				html += 		'<li><span aria-hidden="true" class="icon-calendar"></span><time datetime="'+ e.fecha + '">' + e.fecha + '</time></li>';
				html += 		'<li><h3><a class="pSuspensivos" href="entrada.html?id=' + e.id_entrada + '&&id_comentario=' + e.id + '">' + e.nombre_entrada + '</a></h3></li>';
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


// Función para comprobar si el usuario está logeado
// para que no pueda entrar en la página index.html
function comprobarLogin(){
	if(sessionStorage['du']!=null){
		location.replace('index.html');
	}
}

function comprobarLoginNuevaEntrada(){
	if(sessionStorage['du']==null){
		location.replace('index.html');
	}
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

 	fecha = fecha_acceso.split(" ");
 	sinhoras = fecha[0].split("-");
 	fecha_completa = sinhoras[2]+'/'+sinhoras[1]+'/'+sinhoras[0]+' a las '+fecha[1]+' h';

    html+= '<h2>Login Correcto</h2>';
    html+= '<p>Bienvenido a nuestra web</p>';
    html+= '<p>Su último acceso fue: ' + fecha_completa + '</p>';
    html+= '<a href="index.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    document.body.appendChild(capa_fondo);
}

// Función para mostrar el mensaje emergente cuando se ha 
// podido registrar un usuario.
function mostrarMensajeRegistroCorrecto(){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        //texto = document.querySelector('body>input[name="mensaje"]').value,

        html = '';

    capa_fondo.appendChild(capa_frente);    

    html+= '<h2>Registro completado</h2>';
    html+= '<p>Bienvenido a North & East</p>';
    html+= '<a href="login.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
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

	let xhr1 = new XMLHttpRequest(),
		url1 = 'http://localhost/PHII/practica2/rest/login/';

	
	var login_value = frm.parentNode.querySelector('input[name=login]').value;				
	var nombre_value = frm.parentNode.querySelector('input[name=nombre]').value;
	var pwd_value = frm.parentNode.querySelector('input[name=pwd]').value;
	var pwd2_value = frm.parentNode.querySelector('input[name=pwd2]').value;
	var email_value = frm.parentNode.querySelector('input[name=email]').value;

	let login_disponible = false;

	url1 += login_value;

	xhr1.open('GET', url1, true);

	xhr1.onload = function(){
		console.log(xhr1.responseText);
		let v1 = JSON.parse(xhr1.responseText);

		let error_login = false;
		let error_contrasenya = false;

		if(v1.DISPONIBLE == 'true' && login_value!=''){
			login_disponible = true;
		}

		if((pwd_value != pwd2_value) && (login_disponible == false)){

				//Mensajes de login ya usado y contraseñas no iguales
				document.getElementById("contrasenyaRepetida").innerHTML = "Repite la misma contraseña";

				document.getElementById("loginRepetido").innerHTML = "Login ya está en uso, introduce otro";

				error_login = true;
				error_contrasenya = true;

		}else{
			if(pwd_value != pwd2_value){
				//Mensaje de contraseñas no iguales
				document.getElementById("contrasenyaRepetida").innerHTML = "Repite la misma contraseña";
				error_contrasenya = true;
			}else{
				if(login_disponible == false){
					//Mensaje de login ya usado
					document.getElementById("loginRepetido").innerHTML = "Login ya está en uso, introduce otro";
					error_login = true;
				}
			}
		}

		if(error_login == false){
			// Para eliminar el error del login en el html
			document.getElementById("loginRepetido").innerHTML = "";
		}

		if(error_contrasenya == false){
			// Para eliminar el error de contraseñas no iguales en el html
			document.getElementById("contrasenyaRepetida").innerHTML = "";
		}

	}

	xhr1.send();



	let xhr2 = new XMLHttpRequest(),
		url2 = 'http://localhost/PHII/practica2/rest/usuario/',
		fd = new FormData();


	xhr2.open('POST', url2, true);

	xhr2.onload = function(){
		console.log(xhr2.responseText);
		let v2 = JSON.parse(xhr2.responseText);

		if(v2.RESULTADO != 'error'){
			mostrarMensajeRegistroCorrecto();
		}

	};

	fd.append('login', login_value);
	fd.append('nombre', nombre_value);
	fd.append('pwd', pwd_value);
	fd.append('pwd2', pwd2_value);
	fd.append('email', email_value);

	xhr2.send(fd);

	return false;
}

/*PETICIONES AJAX entradas*/

// Función que realiza la busqueda
function realizarBusqueda(frm){

	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		section = frm.parentNode.parentNode;

	/*Recojo los parámetros del formulario*/
	var titulo_value = document.getElementById("titulo").value;
	var descripcion_value = document.getElementById("descripcion").value;
	var autor_value = document.getElementById("autor").value;
	var dia_inicio_value = document.getElementById("dia_inicio").value; console.log(dia_inicio_value);
	var mes_inicio_value = document.getElementById("mes_inicio").value; console.log(mes_inicio_value);
	var anyo_inicio_value = document.getElementById("anyo_inicio").value; console.log(anyo_inicio_value);
	var dia_final_value = document.getElementById("dia_final").value;
	var mes_final_value = document.getElementById("mes_final").value;
	var anyo_final_value = document.getElementById("anyo_final").value;

	url += '?n=' + titulo_value + '&d=' + descripcion_value + '&l=' + autor_value;
	url += '&fi=' + anyo_inicio_value + '-' + mes_inicio_value + '-' + dia_inicio_value;
	url += '&ff=' + anyo_final_value + '-' + mes_final_value + '-' + dia_final_value;

	console.log(url);	

	xhr.open('GET', url, true);

	xhr.onload = function(){
		console.log(xhr.responseText);
		let v = JSON.parse(xhr.responseText);
		console.log(v.RESULTADO);

		if(v.RESULTADO == 'ok' && ((titulo_value!='' || descripcion_value!='' || autor_value!='') || 
			(dia_inicio_value!='' && mes_inicio_value!='' && anyo_inicio_value!='' && dia_final_value!='' && mes_final_value!='' && anyo_final_value!=''))){

			let html = '';

			for(let i=0; i<v.FILAS.length && i<10; i++){
				let e = v.FILAS[i];

					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;

				html += '<article>';
				html +=   '<h3><a href="entrada.html?id=' + e.id + '">' + e.nombre + '</a></h3>'; 
				html += 	'<figure>';
				html += 		'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 		'<figcaption>' + e.descripcion + '<footer><a href="entrada.html?id=' + e.id + '">Ver más</a></footer></figcaption>';
				html += 	'</figure>';
				html += 	'<footer>';
				html += 	'<ul>';
				html += 		'<li><span aria-hidden="true" class="icon-comment"></span>' + e.ncomentarios + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-picture"></span>' + e.nfotos + '</li>';
				html += 		'<li><span aria-hidden="true" class="icon-calendar"></span><time datetime="'+ e.fecha +'">' + e.fecha + '</time></li>';
				html += 		'<li><span aria-hidden="true" class="icon-user"></span>' + e.login + '</li>';
				html += 	'</ul>';
				html += 	'</footer>';
				html += '</article>';

			}
			section.querySelector('h2+div').innerHTML = html;
			// console.log(v.FILAS.length);
			if(v.FILAS.length == 0 ){
				alert("Ningún resultado coincide con los parámetros de búsqueda");
			}

		}else{
			// Mostrar un mensaje avisando al usuario de que incluya algún parámetro de búsqueda
			alert("Incluye algún parámetro de búsqueda correcto");
			location.replace('buscar.html');
		}

	};

	xhr.send();

	return false;
}


/* NUEVO HECHO por ASIER*/

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


function realizarComentario(btn){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/comentario/',
		fd = new FormData(),
		du = JSON.parse(sessionStorage['du']);

		var id_entrada = getID();

		fd.append('login', du.login);
		fd.append('titulo', btn.parentNode.querySelector('[type=text]').value);
		fd.append('texto', btn.parentNode.querySelector('textarea').value);
		fd.append('id_entrada', id_entrada);

		//console.log(id_entrada);
		
		xhr.open('POST', url, true);
		xhr.onload = function(){
			console.log(xhr.responseText);
			let v = JSON.parse(xhr.responseText);

			if(v.RESULTADO = 'ok'){
				mensajeComentarioCorrecto();
			}else{
				mensajeComentarioIncorrecto();
			}

		};
		xhr.setRequestHeader('Authorization', du.clave);
		xhr.send(fd);
		
		return false;
}

// Función que muestra el formulario para hacer el comentario de una entrada
// si has iniciciado sesión.
// Y si no has inicado sesión no se muestra el formulario sino un mensaje para
// iniciar sesión.
function mostrarFormComentario(){
	let html = '';
	if (sessionStorage['du']!=null){

    	html +=	'<ul class="formList">';	
		html += 	'<li>';
		html +=			'<label for="tituloComentario">Título</label>';
		html += 		'<input name="tituloComentario" maxlength="50" type="text" id="tituloComentario" placeholder="título" required/>';
		html += 	'</li>';				
		html +=		'<li>';
		html +=			'<label for="textComentario">Texto comentario</label>';
		html +=			'<textarea name="textComentario" id="textComentario" maxlength="200" rows=4 required></textarea>';
		html +=		'</li>';	
		html += '</ul>';
		html += '<p><input name="submit" value="Comentar" type="Submit" id="comentarSubmit"/></p>';
	   
	    document.querySelector('body>section>form>fieldset').innerHTML = html;

	  }else{

	  	html += '<p>Para dejar un comentario debes inicar sesión</p>';
	    html += '<p><a href="login.html">Iniciar sesión</a></p>';
	    
	    document.querySelector('body>section>form>fieldset').innerHTML = html;
	  }
}

function mensajeComentarioCorrecto(){
	let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),

        //texto = document.querySelector('body>input[name="mensaje"]').value,

        html = '';

    capa_fondo.appendChild(capa_frente);    

    // id de la entrada actual
    var id_entrada = getID();

    html+= '<h2>Comentario realizado de forma correcta</h2>';
    html+= '<a href="entrada.html?id=' + id_entrada + '"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    //location.replace("index.html");

    document.body.appendChild(capa_fondo);
}

function mensajeComentarioIncorrecto(){
	let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        //texto = document.querySelector('body>input[name="mensaje"]').value,

        html = '';

    capa_fondo.appendChild(capa_frente);    

    // id de la entrada actual
    var id_entrada = getID();

    html+= '<h2>Comentario realizado de forma incorrecta</h2>';
    html+= '<a href="entrada.html?id=' + id_entrada + '"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
    capa_frente.innerHTML = html;
    capa_fondo.classList.add('capa-fondo'); 
    capa_frente.classList.add('capa-frente');

    document.body.appendChild(capa_fondo);
}

/*FIN NUEVO HECHO POR ASIER*/
