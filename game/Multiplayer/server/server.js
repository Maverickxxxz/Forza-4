

//Rimozione messaggio CORS permettendo l'origine del localhost
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})

//MAP con nomeStanza e idStanza
const stanzeAttive = new Map();
var fs = require('fs');


function letturaDati(){
    const dati = fs.readFileSync('stanzeAttive.json', 'utf-8');
    let data =  JSON.parse(dati);
    return data;
}

function scritturaDati(data){
    fs.writeFile('stanzeAttive.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Errore durante la scrittura del file:', err);
        } else {
            //console.log('Dati aggiornati con successo nel file stanzeAttive.json');
        }
    });
}


//Ascolto del server di messaggi in arrivo
io.on('connection', socket => {
    
    socket.on("messaggi-al-server", messaggio =>{
        console.log(messaggio);
    })

    // Gestione della creazione delle stanze
    socket.on("crea-stanza", (nomeStanza, nome_utente) => {
        const idStanza = Math.random().toString(36);
       
        
        let data = {
            [idStanza]: {
                nomeStanza: nomeStanza,
                giocatori: {
                    socketID_G1: socket.id,
                    giocatore1: nome_utente,
                    giocatore2: null,
                    socketID_G2: null,
                }
            }
        }

        let old_data = letturaDati();
        let stanzaEsiste = false;

        for(let x in old_data){
            if(old_data[x]["nomeStanza"] == nomeStanza){
                stanzaEsiste = true; 
            }
        }

        if(stanzaEsiste){   
            socket.emit("messaggi-al-client", "errore_creazione_nome");
        }
        
        else{
                //AGGIUNTA DEL DATA AL FILE .JSON
                Object.assign(old_data, data)
                scritturaDati(old_data); 
                socket.join(idStanza); //LA SOCKET SI CONNETTE A QUELLA STANZA
                socket.emit("stanza-creata", idStanza, nomeStanza);
                console.log("Stanza " + "'" + nomeStanza + "'"  + " creata correttamente da " + "'" + nome_utente + "'" );
            }
    });


    // Gestione dell'unione alle stanze
    socket.on("unisciti-stanza", (nomeStanzaUnione, nome_ut) => {      
        let old_data = letturaDati();
        let stanzaTrovata = false;
        let idStanza;
        let creatore_stanza;
        
        for(let x in old_data){
            if(old_data[x]["nomeStanza"] == nomeStanzaUnione){
                stanzaTrovata = true; 
                idStanza = x;
                old_data[x]["giocatori"]["giocatore2"] = nome_ut;
                old_data[x]["giocatori"]["socketID_G2"] = socket.id;
                creatore_stanza = old_data[x]["giocatori"]["giocatore1"];
                scritturaDati(old_data);
            }
        }
        
        if (stanzaTrovata) {
            socket.join(idStanza);
            console.log("'" + nome_ut + "'" + " si è connesso correttamente alla stanza di " +  "'" + creatore_stanza + "'");

            // Controlla se ci sono almeno due giocatori nella stanza
            const clients = io.sockets.adapter.rooms.get(idStanza); //VERIFICA I CLIENT CONNESSI IN QUELLA DETERMINATA STANZA RIDANDOMI IL SOCKET.ID DI OGNUNO DI ESSI

            if (clients.size == 2) { //VERIFICHIAMO CHE LA SIZE SIA == 2
                io.to(idStanza).emit("naviga-a-gioco", idStanza);      
            }
            
        } else {
            socket.emit("stanza-sbagliata", nomeStanzaUnione);
        }
    });


})

