const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // ==================================
    // Escucha el evento que se genera en nuevo.ticker-control.js
    // Proceso acumular tickets
    // ==================================
    client.on('siguienteTicket', (data, callback) => {
        //data que en este caso es null
        let siguiente = ticketControl.siguiente();

        /*callback({
            siguiente
        });*/

        callback(siguiente)
    
    });

    
    // ==================================
    // Envia el evento que se escuchara en nuevo.ticker-control.js, 
    // Proceso para saber por cual ticket van
    // ==================================
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    // ==================================
    // Escucha el evento que se genera en nuevo.ticker-control.js
    // Proceso para enviar el ticket a atender al escritorio que genere el evento
    // ==================================
    client.on('atenderTicket', (data, callback) => {

        if( !data.escritorio ){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio);

        callback( atenderTicket );

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });

});