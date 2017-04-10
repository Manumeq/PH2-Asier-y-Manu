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

			console.log(v);

			for(let i=0; i<v.FILAS.length & i<6; i++){
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


//metodo 2 para añadir entradas
function mostrarEntradas2(frm){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost:4443/ph2/rest/entrada/',
		section = frm.parentNode.parentNode;

	url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value; 

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){

			/*Este metodo se puede utilizar para eliminar el contenido del doom que queremos eliminar por ejemplo para los imagenes*/
			while (a = section.querySelector('div>article'))
				a.remove();

			let html = '';

			for(let i=0; i<v.FILAS.length; i++){
				let e = v.FILAS[i],
					foto = 'http://localhost:4443/ph2/fotos/' + e.fichero;
					let article = document.createElement('article'),	//el nombre de la variable no tiene porque ser lo mismo
						h3= document.createElement('h3'),
						div= document.createElement('div'),
						img = document.createElement('img'),
						p = document.createElement('p'),
						footer = document.createElement('footer'),
						p2 = document.createElement('p'),
						time = document.createElement('time'),
						p3= document.createElement('p'),
						p4 = document.createElement('p');

						article.appendChild(h3);	
						article.appendChild(div);
						article.appendChild(footer);
						/*article.insertBefore(div, footer); //para insertar el div antes del footer no hace falta insertarlo asi*/

						div.appendChild(img);
						div.appendChild(p);

						footer.appendChild(p2);
						footer.appendChild(time);
						footer.appendChild(p3);
						footer.appendChild(p4);

						h3.innerHTML = e.nombre;
						img.setAttribute('src', foto);
						/*img.src = foto; forma alternativa de hacer lo de arriba*/
						img.setAttribute('alt', e.descripcion_foto);
						p.innerHTML = e.descripcion;
						p2.innerHTML = e.login;
						time.innerHTML = e.fecha //para cambiar el formato de fecha crear una funcion que lo cambie
						time.setAttribute('datetime', e.fecha);
						p3.innerHTML = e.nfotos + " fotos";
						p4.innerHTML = e.ncomentarios + " comentarios";

						section.querySelector('h2+div').appendChild(article);

			}//for(let i=0; i<v.FILAS.length; i++)
		}
	}

	xhr.send();

	return false;
}


//metodo 3 para añadir entradas
function mostrarEntradas3(frm){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost:4443/ph2/rest/entrada/',

		section = frm.parentNode.parentNode;

	url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value; 

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){

			while (a = section.querySelector('div>article'))
				a.remove();

			let html = '';

			for(let i=0; i<v.FILAS.length; i++){
				let e = v.FILAS[i],
					foto = 'http://localhost:4443/ph2/fotos/' + e.fichero;

					let article = section.querySelector('div>template').content.cloneNode(true);

						article.querySelector('h3').innerHTML = e.nombre;
						article.querySelector('div>img').setAttribute('src',foto);
						article.querySelector('div>img').setAttribute('alt', e.descripcion_foto);
						article.querySelector('div>p').innerHTML = e.descripcion;
						article.querySelector('footer>p:first-of-type').innerHTML = e.login;
						article.querySelector('footer>time').innerHTML = e.fecha;
						article.querySelector('footer>p:nth-of-type(2)').innerHTML = e.nfotos + " fotos";
						article.querySelector('footer>p:nth-of-type(3)').innerHTML = e.ncomentarios + " comentarios";
						
						section.querySelector('h2+div').appendChild(article);

			}//for(let i=0; i<v.FILAS.length; i++)
		}
	}

	xhr.send();

	return false;
}