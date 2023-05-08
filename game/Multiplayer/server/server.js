//Rimozione messaggio CORS permettendo l'origine del localhost
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})

//MAP con nomeStanza e idStanza
const stanzeAttive = new Map();


//Ascolto del server di messaggi in arrivo
io.on('connection', socket => {
    //console.log(socket.id)
    socket.on("messaggi-al-server", messaggio =>{
        console.log(messaggio);
    })

     // Gestione della creazione delle stanze
     socket.on("crea-stanza", nomeStanza => {

        if(stanzeAttive.has(nomeStanza)){
            socket.emit("messaggi-al-client", "Una stanza con questo nome è già stata creata, usane un altro");
            return;
        }

        const idStanza = Math.random().toString(36);
        stanzeAttive.set(nomeStanza, idStanza);
        console.log(stanzeAttive);
        socket.join(idStanza); //LA SOCKET SI CONNETTE A QUELLA STANZA
        socket.emit("stanza-creata", nomeStanza, idStanza);
        
    });

    // Gestione dell'unione alle stanze
    socket.on("unisciti-stanza", nomeStanzaUnione => {        
        if (stanzeAttive.has(nomeStanzaUnione)) {
            
            socket.join(nomeStanzaUnione);
            socket.emit("stanza-giusta", nomeStanzaUnione, stanzeAttive.get(nomeStanzaUnione));
            
        } else {
            socket.emit("stanza-sbagliata", nomeStanzaUnione);
        }
    });

})

