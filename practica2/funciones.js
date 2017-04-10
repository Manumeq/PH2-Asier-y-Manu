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
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PHII/practica2/rest/entrada/',
		section = frm.parentNode.parentNode;

	url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value; 

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let html = '';

			for(let i=0; i<v.FILAS.length; i++){
				let e = v.FILAS[i],

					foto = 'http://localhost/PHII/practica2/fotos/' + e.fichero;

				html += '<article>';
				html += 	'<h3>' + e.nombre + '</h3>';
				html += 	'<div>';
				html += 		'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 		'<p>' + e.descripcion + '</p>';
				html += 	'</div>';
				html += 	'<footer>';
				html += 		'<p>' + e.login + '</p>';
				html += 		'<time datetime="'+ e.fecha + '">' + e.fecha + '</time>';
				html += 		'<p>' + e.nfotos + ' fotos</p>';
				html += 		'<p>' + e.ncomentarios + ' comentarios</p>';
				html += 	'</footer>';
				html += '</article>';

			}//for(let i=0; i<v.FILAS.length; i++)
			section.querySelector('h2+div').innerHTML = html;
		}
	}

	xhr.send();

	return false;
}