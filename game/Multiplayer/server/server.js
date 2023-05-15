//Rimozione messaggio CORS permettendo l'origine del localhost
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})

//MAP con nomeStanza e idStanza
var fs = require('fs');

fs.writeFile('stanzeAttive.json', "{}", (err) => {
    if (err) {
        console.error('Errore durante la scrittura del file:', err);
    } else {
        //console.log('Dati aggiornati con successo nel file stanzeAttive.json');
    }
});


function letturaDati(){
    let dati = fs.readFileSync('stanzeAttive.json', 'utf-8');
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


function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }
  
   // vertical
   for (let c = 0; c < columns; c++) {
       for (let r = 0; r < rows - 3; r++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
  
   // anti diagonal
   for (let r = 0; r < rows - 3; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
  
   // diagonal
   for (let r = 3; r < rows; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
  }

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}

function updateGame(mossa){
   
}




function inizio_turno(idStanza) {
    // Genera un numero casuale tra 0 e 1
    var num = Math.random();
    let data = letturaDati();
    let giocatore1;
    let giocatore2;
    let giocatore1_SID;
    let giocatore2_SID;

    
    if (num < 0.5) {
        giocatore1  = true;
        giocatore2  = false;

    } else {
        giocatore1 = false;
        giocatore2  = true;
    }

    for(let id in data){
        if(id == idStanza){
            
            data[id]['giocatori']['turnoG1'] = giocatore1;
            giocatore1_SID = data[id]['giocatori']['socketID_G1'];
            data[id]['giocatori']['turnoG2'] = giocatore2;
            giocatore2_SID = data[id]['giocatori']['socketID_G2']; 
        }
    }

    scritturaDati(data);

    if(giocatore1){return giocatore1_SID;}
    else{return giocatore2_SID;}

}

function cambio_turno(idStanza){
    let data = letturaDati();
    let giocatoreCorrente;

    for(let id in data){
        if(id == idStanza){       
            if(data[id]['giocatori']['turnoG1'] == false){  
                console.log("G1 ORA GIOCA");
                data[id]['giocatori']['turnoG1'] = true;
                data[id]['giocatori']['turnoG2'] = false;
                giocatoreCorrente = data[id]['giocatori']['socketID_G1'];
                giocatoreNonCorrente = data[id]['giocatori']['socketID_G2'];
                io.to(giocatoreCorrente).emit("giocatore-corrente", idStanza);
                io.to(giocatoreNonCorrente).emit("giocatore-non-corrente", idStanza);
            }

            else{
                console.log("G2 ORA GIOCA");
                data[id]['giocatori']['turnoG1'] = false;
                data[id]['giocatori']['turnoG2'] = true;
                giocatoreCorrente = data[id]['giocatori']['socketID_G2'];
                giocatoreNonCorrente = data[id]['giocatori']['socketID_G1'];
                io.to(giocatoreCorrente).emit("giocatore-corrente", idStanza);
                io.to(giocatoreNonCorrente).emit("giocatore-non-corrente", idStanza);
                
            }
        }

    }

    scritturaDati(data);
    return giocatoreCorrente;
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
                    turnoG1: null,
                    giocatore2: null,
                    socketID_G2: null,
                    turnoG2: null,
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
                creatore_stanza_ID = old_data[x]["giocatori"]["socketID_G1"];
                scritturaDati(old_data);
            }
        }
        
        if (stanzaTrovata) {
            socket.join(idStanza);
            console.log("'" + nome_ut + "'" + " si è connesso correttamente alla stanza di " +  "'" + creatore_stanza + "'");

            // Controlla se ci sono almeno due giocatori nella stanza
            const clients = io.sockets.adapter.rooms.get(idStanza); //VERIFICA I CLIENT CONNESSI IN QUELLA DETERMINATA STANZA RIDANDOMI IL SOCKET.ID DI OGNUNO DI ESSI

            if (clients.size == 2) { //VERIFICHIAMO CHE LA SIZE SIA == 2  
                io.to(idStanza).emit("naviga-a-gioco", idStanza, creatore_stanza_ID);
                io.to(creatore_stanza_ID).emit("creatore", idStanza);
            }
            
        } else {
            socket.emit("stanza-sbagliata", nomeStanzaUnione);
        }
    });

    socket.on("inizio-gioco", (idStanza) => {   
        let giocatoreCorrenteID = inizio_turno(idStanza);      
        console.log("ID_GIOCATORECORR: ",giocatoreCorrenteID);
        io.to(giocatoreCorrenteID).emit("giocatore-corrente", idStanza);

    });

    socket.on("mossa", (mossa, idStanza) => { 
        console.log("MOSSA: ", mossa);
        console.log("IDSTANZA: ", idStanza);
        cambio_turno(idStanza);
        //io.to(giocatoreCorrente).emit("mossa", idStanza);
    });




})

