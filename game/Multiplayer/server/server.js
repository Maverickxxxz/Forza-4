//Rimozione messaggio CORS permettendo l'origine del localhost
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})

//MAP con nomeStanza e idStanza
var fs = require('fs');
//Importiamo il file database
var db = require('./database');

db.connect();

fs.writeFile('stanzeAttive.json', "{}", (err) => {
    if (err) {
        console.error('Errore durante la scrittura del file:', err);
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
        }
    });
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
            scritturaDati(data);         
        }
    }

    if(giocatore1){return giocatore1_SID;
    }
    else{return giocatore2_SID;}

}

function cambio_colore(colore){
    if(colore=="rosso"){return "giallo";} 
    if(colore=="giallo"){return "rosso";}
}



function cambio_turno(idStanza){
    let data = letturaDati();
    let giocatoreCorrente;

    for(let id in data){
        if(id == idStanza){  

            if(data[id]['giocatori']['turnoG1'] == false){  
                data[id]['giocatori']['turnoG1'] = true;
                data[id]['giocatori']['turnoG2'] = false;
                giocatoreCorrente = data[id]['giocatori']['socketID_G1'];
                giocatoreNonCorrente = data[id]['giocatori']['socketID_G2'];
                 io.to(giocatoreNonCorrente).emit("giocatore-non-corrente", idStanza);
             }

            else{
                data[id]['giocatori']['turnoG1'] = false;
                data[id]['giocatori']['turnoG2'] = true;
                giocatoreCorrente = data[id]['giocatori']['socketID_G2'];
                giocatoreNonCorrente = data[id]['giocatori']['socketID_G1'];
                io.to(giocatoreNonCorrente).emit("giocatore-non-corrente", idStanza);  
            }
        }
    }
    scritturaDati(data);
    return giocatoreCorrente;
}



let giocatori_attivi = {};
//Ascolto del server di messaggi in arrivo
io.on('connection', socket => {

    socket.on("disconnect", () => {
        let data = letturaDati();
        for(let x in data){
            if(data[x]["giocatori"]["socketID_G1"] == socket.id){
                if(data[x]["giocatori"]["numero"] == 2){
                    let socketG2 = data[x]["giocatori"]["socketID_G2"];
                    delete data[x];
                    io.to(socketG2).emit("avversario-disconnesso");          
                    scritturaDati(data);
                    letturaStanzeAttive(data);
                    break;
                }
            }
            if(data[x]["giocatori"]["socketID_G2"] == socket.id){
                
                if(data[x]["giocatori"]["numero"] == 2){
                    let socketG1 = data[x]["giocatori"]["socketID_G1"];
                    delete data[x];
                    io.to(socketG1).emit("avversario-disconnesso");       
                    scritturaDati(data);
                    letturaStanzeAttive(data);
                    break;
                }
            }

            delete data[x];
            scritturaDati(data);
            letturaStanzeAttive(data);

            break;
        }
        delete giocatori_attivi[socket.id];
      });
    


    function letturaUtenti(){
        db.utenti(function(result) {    
            socket.emit("utenti", result);
        });
    }
     
    function letturaStanzeAttive(data){
        for(let id in data){
            socket.emit("stanze-attive", data[id]['nomeStanza'], data[id]['giocatori']['giocatore1'], data[id]['giocatori']['numero']);
        }
    }

    function letturaClassifica(){
        db.classifica(function(result) {
            socket.emit("classifica", result);
            });
    }

    
    //Elimina la stanza una volta che il gioco finisce
    function eliminaStanzeAttive(data, nomeStanza){
        for(let id in data){
            if(id==nomeStanza){        
                delete data[id];
                scritturaDati(data);
            }         
        }
    }

    function verifica_vincita(board) {
        let rows = 6;
        let columns = 7;
    
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++){
               if (board[r][c] != ' ') {
                   if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                       return true;
                   }
               }
            }
       }
      
       // vertical
       for (let c = 0; c < columns; c++) {
           for (let r = 0; r < rows - 3; r++) {
               if (board[r][c] != ' ') {
                   if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                       return true;
                   }
               }
           }
       }
      
       // anti diagonal
       for (let r = 0; r < rows - 3; r++) {
           for (let c = 0; c < columns - 3; c++) {
               if (board[r][c] != ' ') {
                   if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                       return true;
                   }
               }
           }
       }
      
       // diagonal
       for (let r = 3; r < rows; r++) {
           for (let c = 0; c < columns - 3; c++) {
               if (board[r][c] != ' ') {
                   if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                       return true;
                   }
               }
           }
       }
      }

    function vincitore(nome_utente){
        let vince;
        let perde;      
        let data = letturaDati();

        for(let x in data){
            if(data[x]["giocatori"]["giocatore1"] == nome_utente){
                vince = data[x]["giocatori"]["socketID_G1"];
                perde = data[x]["giocatori"]["socketID_G2"];
            }

            if(data[x]["giocatori"]["giocatore2"] == nome_utente){
                vince = data[x]["giocatori"]["socketID_G2"];
                perde = data[x]["giocatori"]["socketID_G1"];
            }
        }

        let coppia = [vince, perde];

        return coppia;
    }

    socket.on("sono-connesso", (socket_id, id) =>{
        
        let già_connesso = false;     

        for(let x in giocatori_attivi){
            if (giocatori_attivi[x] === id) {   
                socket.emit("doppia-connessione");  
                già_connesso = true;
            }        
        }

        if (!già_connesso) {
            giocatori_attivi[socket_id] = id;
        }

        

        
        
    });

    letturaUtenti();
    // Lettura delle stanze attive in modo che altri giocatori possano connettersi senza sapere il codice
    let data_stanze = letturaDati();
    letturaStanzeAttive(data_stanze);
    letturaClassifica();
    

    // Gestione della creazione delle stanze
    socket.on("crea-stanza", (nomeStanza, nome_utente) => {
        const idStanza = Math.random().toString(36);
        let numero_g = 1;
       
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
                    numero: numero_g,
                },
            }
        }

        let old_data = letturaDati();
        let stanzaEsiste = false;

        for(let x in old_data){
            if(old_data[x]["nomeStanza"] == nomeStanza){
                stanzaEsiste = true; 
            }
            if(old_data[x]["giocatori"]["giocatore1"] == nome_utente){
                socket.emit("messaggi-al-client", "stesso-utente-creazione");
                return;
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
                io.emit("stanze-attive", nomeStanza, nome_utente, numero_g)
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

                if(old_data[x]["giocatori"]["giocatore1"] == nome_ut){
                    //socket.emit("messaggi-al-client", "stesso-utente");
                    //return;
                }

                idStanza = x;

                if(old_data[x]["giocatori"]["numero"] == 2){
                    socket.emit("messaggi-al-client", "stanza-piena");
                    return;
                }

                old_data[x]["giocatori"]["numero"] = 2;
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
            io.to(idStanza).emit("naviga-a-gioco", idStanza, creatore_stanza_ID);     
            io.to(creatore_stanza_ID).emit("creatore", idStanza);
   
        } else {
            socket.emit("messaggi-al-client", "sbagliata");
            let data = letturaDati();
            for(x in data){
                if(x==nomeStanzaUnione){
                delete data[x];
                break;
                }  
            }
            
        }
    });

    socket.on("inizio-gioco", (idStanza) => {   
        let giocatoreCorrenteID = inizio_turno(idStanza);   
        let colore = "rosso";
        io.to(giocatoreCorrenteID).emit("primo-giocatore", idStanza, colore);
    });

      
    
    socket.on("mossa", (mossa, idStanza, board, colore, nome_utente) => {  
        
        io.to(idStanza).emit("aggiorna-gioco", mossa, colore);

        if(verifica_vincita(board)){      
            let coppia = vincitore(nome_utente);

            io.to(coppia[0]).emit("vincitore", idStanza, colore);
            io.to(coppia[1]).emit("perdente", idStanza, colore);

            
            db.update(nome_utente, function(result) {
                
              });

            eliminaStanzeAttive(letturaDati(), idStanza);
            return;
        }
        
        giocatoreCorrente = cambio_turno(idStanza); 
        
        colore = cambio_colore(colore);
        io.to(giocatoreCorrente).emit("giocatore-corrente", idStanza, colore);  
        
    });



    


})
