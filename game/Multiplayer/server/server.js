var contatore;

//Rimozione messaggio CORS permettendo l'origine del localhost
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})

//MAP con nomeStanza e idStanza
const stanzeAttive = new Map();
var fs = require('fs');

fs.writeFile('stanzeAttive.json', "{}", (err) => {
    if (err) {
        console.error('Errore durante la scrittura del file:', err);
    } else {
        //console.log('Dati aggiornati con successo nel file stanzeAttive.json');
    }
});


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

function scritturaTurno(idStanza, giocatore1STATO, giocatore2STATO){
    let data = letturaDati();

    for(let id in data){
        if(id == idStanza){
            data[id]['giocatori']['turnoG1'] = giocatore1STATO;
            data[id]['giocatori']['turnoG2'] = giocatore2STATO;
        }
    }
    scritturaDati(data);
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

function setPiece() {
  
  
    //if (gameOver) {
    //    return;
    //}
  
    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
  
    // figure out which row the current column should be on
    r = currColumns[c]; 
  
    if (r < 0) { // board[r][c] != ' '
        return;
    }
  
    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }
  
    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array
  
    //checkWinner();
  
  }

function inizio_turno(idStanza) {
    // Genera un numero casuale tra 0 e 1
    var num = Math.random();
    let giocatore1;
    let giocatore2;

    if (num < 0.5) {
        giocatore1  = true;
        giocatore2  = false;

    } else {
        giocatore1 = false;
        giocatore2  = true;
    }

    scritturaTurno(idStanza, giocatore1, giocatore2);
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
        inizio_turno(idStanza);
    });



})

