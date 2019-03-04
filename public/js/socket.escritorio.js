// =================================
// Comando para establecer la conexion
// =================================
var socket = io();

// =================================
// Obtener todos los parametros por URL, esto no lo soporta internet explore
// =================================
var searchParams = new URLSearchParams( window.location.search ); 

// =================================
// con has busco esa variable en la url
// searchParams.has('escritorio')
// sino existe salgo de la pantalla
// =================================
if( !searchParams.has('escritorio') ){

	window.location = 'index.html';
	// =================================
	// esto es para detener el codigo de javascript
	// es igual a return pero no estoy dentro de una funcion
	// =================================
	throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var small = $('small');

$('h1').text('Escritorio ' + escritorio );


$('button').on('click', function(){

	socket.emit('atenderTicket', {escritorio: escritorio}, function( resp ){

		if( resp === 'No hay tickets'){
			small.text(resp);
			alert(resp);
			return;

		}

		small.text('Ticket ' + resp.numero);
		//console.log( resp );
	});

});