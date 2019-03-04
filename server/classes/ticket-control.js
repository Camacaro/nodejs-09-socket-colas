
const fs = require('fs');

class Ticket {
	
	constructor( numero, escritorio ) {

		this.numero = numero;
		this.escritorio = escritorio;

	}

	getElemento(){

		let parametros = {
			numero : this.numero,
			escritorio :this.escritorio
		}

		return parametros;
	}
}

class TicketControl {

	constructor() {

		this.ultimo = 0;
		this.hoy    = new Date().getDate(); 
		//contendra todos los tickes en revision
		this.tickets = [];
		this.ultimos4 = [];

		let data = require('../data/data.json');

		//console.log(data);

		if( data.hoy === this.hoy ){

			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;

		}else{

			this.reiniciarConteo();

		}
	}

	siguiente(){

		this.ultimo += 1;

		let ticket = new Ticket( this.ultimo, null );
		this.tickets.push(ticket);

		this.grabarArchivo();

		return `Ticket ${ this.ultimo }`;

	}

	getUltimoTicket() {
		return `Ticket ${ this.ultimo }`;
	}

	getUltimos4() {
		return this.ultimos4;
	}

	atenderTicket( escritorio ) {

		if( this.tickets.length === 0 ){
			return 'No hay tickets';
		}

		// ==================================
		// Obtener primer elemento de un arrglo
		// ==================================
		let numeroTicket = this.tickets[0].numero;

		// ==================================
		// Borrar primer elemento de un arrglo
		// ==================================
		this.tickets.shift();

		let atenderTicket = new Ticket( numeroTicket, escritorio );
		

		// ==================================
		// Agregar un elemento al inicio del arrego
		// ==================================
		this.ultimos4.unshift( atenderTicket );

		if( this.ultimos4.length > 4 ){
			// ==================================
			// Borrar ultimo elemento de un arreglo
			// ==================================
			this.ultimos4.splice(-1,1);
		}		

		console.log('Ultimos 4');
		console.log( this.ultimos4 );

		this.grabarArchivo();

		return atenderTicket;
	}


	reiniciarConteo() {

		this.ultimo = 0;
		this.tickets = [];
		this.ultimos4 = [];

		this.grabarArchivo();

		console.log('reiniciar conteo');
	}

	grabarArchivo() {

		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4
		};

		let jsonDataString = JSON.stringify( jsonData );

		fs.writeFileSync('./server/data/data.json', jsonDataString);

	}

}

module.exports = {
	TicketControl
}