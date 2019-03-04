
// =================================
// Comando para establecer la conexion
// =================================
var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function () {
  	console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
  	console.log('desconectado del servidor');
});


// =================================
// on, recibir informacion
// primer parametro es el nombre del evento
// segundo parametro, funcion que trabajara la variable
// =================================
socket.on('estadoActual', function ( ticketActual ) {
  	label.text( ticketActual.actual );
});


$('button').on('click', function(){

	//console.log('click');

	// =================================
	// emit, enviar informacion
	// primer parametro es el nombre del evento
	// segundo parametro la data a enviar, este caso null, sino {ticket:1}
	// tercer parametro function callback a ejecutar si llega al servidor
	// =================================
	socket.emit('siguienteTicket', null, function( siguienteTicket ){ 
		
		label.text( siguienteTicket );

		//console.log( siguienteTicket ) ;
	});

});