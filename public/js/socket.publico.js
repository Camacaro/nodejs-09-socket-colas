// =================================
// Comando para establecer la conexion
// =================================
var socket = io();

// =================================
// Aqui es recomendable poner el connect y disconnect ya que este estara al publico y saber si esta conectado al servidor o no
// =================================

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');


var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [ lblTicket1, lblTicket2, lblTicket3, lblTicket4];

var lblEscritorios = [ lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]; 


socket.on('estadoActual', function ( data ) {
  	//label.text( ticketActual.actual );
  	//console.log( data );
  	actualizaHTML( data.ultimos4 );
});


socket.on('ultimos4', function ( data ) {

	//var audio = document.getElementById("audio");
	var audio = new Audio('audio/new-ticket.mp3');
	audio.play(); 

  	actualizaHTML( data.ultimos4 );
});

async function playVideo() {
	  try {
	  	var media = new Audio('audio/new-ticket.mp3');
	    await media.play();
	    console.log('suena');
	  } catch(err) {
	    console.log('no suena ', err);
	  }
	}


function actualizaHTML( ultimos4 ){

	for(var i=0; i <= ultimos4.length -1; i++ ){


		lblTickets[i].text('Ticket ' + ultimos4[i].numero );

		lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio );
		

		

	}
}