//Rimozione messaggio CORS permettendo l'origine del localhost
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})


var fs = require('fs');
//Importiamo il file database
var db = require('./database');

//Connessione al database
db.connect();

//Inizializziamo il file stanzeAttive se il server viene riavviato
fs.writeFile('stanzeAttive.json', "{}", (err) => {
    if (err) {
        console.error('Errore durante la scrittura del file:', err);
    }
});

//Funzione per la lettura dei dati nel file stanzeAttive.json
function letturaDati(){
    let dati = fs.readFileSync('stanzeAttive.json', 'utf-8');
    let data =  JSON.parse(dati);
    return data;
}

//Funzione per la scrittura dei dati nel file stanzeAttive.json, prende in argomento il nuovo contenuto da sovrascrivere
function scritturaDati(data){
    fs.writeFile('stanzeAttive.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Errore durante la scrittura del file:', err);
        }
    });
}

//Funzione che decide casualmente quale sarà il primo giocatore
function inizio_turno(idStanza) {
    // Genera un numero casuale tra 0 e 1
    var num = Math.random();
    let data = letturaDati();
    let giocatore1;
    let giocatore2;
    let giocatore1_ut;
    let giocatore2_ut;
    let giocatore1_SID;
    let giocatore2_SID;

    if (num < 0.5) {
        giocatore1  = true;
        giocatore2  = false;

    } else {
        giocatore1 = false;
        giocatore2  = true;
    }

    //Mi ritorna varie informazioni degli utenti connessi in quella specifica stanza
    let utenti = [];
    for(let id in data){
        if(id == idStanza){
            data[id]['giocatori']['turnoG1'] = giocatore1;
            giocatore1_SID = data[id]['giocatori']['socketID_G1'];
            giocatore1_ut = data[id]['giocatori']['giocatore1'];
            data[id]['giocatori']['turnoG2'] = giocatore2;
            giocatore2_SID = data[id]['giocatori']['socketID_G2']; 
            giocatore2_ut = data[id]['giocatori']['giocatore2'];
            scritturaDati(data);     
            utenti.push(id, giocatore1_SID, giocatore2_SID, giocatore1_ut, giocatore2_ut, giocatore1, giocatore2);    
        }
    }

    return utenti;

}

function cambio_colore(colore){
    if(colore=="rosso"){return "giallo";} 
    if(colore=="giallo"){return "rosso";}
}


//Cambia il turno dei giocatori, dopo ogni mossa
function cambio_turno(idStanza){
    let data = letturaDati();
    let primo;
    let giocatoreCorrente;
    let utente = [];

    for(let id in data){
        if(id == idStanza){  

            if(data[id]['giocatori']['turnoG1'] == false){  
                data[id]['giocatori']['turnoG1'] = true;
                data[id]['giocatori']['turnoG2'] = false;
                primo = data[id]['giocatori']['giocatore1'];
                giocatoreCorrente = data[id]['giocatori']['socketID_G1'];
                giocatoreNonCorrente = data[id]['giocatori']['socketID_G2'];
                 io.to(giocatoreNonCorrente).emit("giocatore-non-corrente", idStanza);
             }

            else{
                data[id]['giocatori']['turnoG1'] = false;
                data[id]['giocatori']['turnoG2'] = true;
                primo = data[id]['giocatori']['giocatore2'];
                giocatoreCorrente = data[id]['giocatori']['socketID_G2'];
                giocatoreNonCorrente = data[id]['giocatori']['socketID_G1'];
                io.to(giocatoreNonCorrente).emit("giocatore-non-corrente", idStanza);  
            }
        }
    }

    utente.push(giocatoreCorrente, primo);
    scritturaDati(data);
    return utente;
}



let giocatori_attivi = {};
//Ascolto del server di messaggi in arrivo
io.on('connection', socket => {

    //Si avvia qualora un utente si dovesse disconnettere, e invia un messaggio all'altro utente connesso
    socket.on("disconnect", () => {
        let data = letturaDati();
        let giocatore;
        for(let x in data){
            if(data[x]["giocatori"]["socketID_G1"] == socket.id){
                if(data[x]["giocatori"]["numero"] == 2){
                    giocatore = data[x]["giocatori"]["giocatore1"];
                    let socketG2 = data[x]["giocatori"]["socketID_G2"];
                    delete data[x];
                    io.to(socketG2).emit("avversario-disconnesso");          
                    scritturaDati(data);
                    letturaStanzeAttive(data);
                    db.penalizzazione(giocatore, function(result) {});
                    break;
                }
            }
            if(data[x]["giocatori"]["socketID_G2"] == socket.id){
                
                if(data[x]["giocatori"]["numero"] == 2){
                    let socketG1 = data[x]["giocatori"]["socketID_G1"];
                    giocatore = data[x]["giocatori"]["giocatore2"];
                    delete data[x];
                    io.to(socketG1).emit("avversario-disconnesso");       
                    scritturaDati(data);
                    letturaStanzeAttive(data);
                    db.penalizzazione(giocatore, function(result) {});
                    break;
                }
            }

            

            if(socket.id==data[x]["giocatori"]["socketID_G2"] || socket.id ==data[x]["giocatori"]["socketID_G1"]){
                delete data[x];
                scritturaDati(data);
            }
            
            //Riaggiorna le stanzeAttive
            letturaStanzeAttive(data); 

            break;
        }
        delete giocatori_attivi[socket.id];
      });
    

    //Legge gli utenti registrati, in modo che nessun utente non registrato possa giocare
    function letturaUtenti(){
        db.utenti(function(result) {    
            socket.emit("utenti", result);
        });
    }
     
    //Legge le stanze attualmente attive
    function letturaStanzeAttive(data){
        for(let id in data){
            socket.emit("stanze-attive", data[id]['nomeStanza'], data[id]['giocatori']['giocatore1'], data[id]['giocatori']['numero']);
        }
    }

    //Legge la classifica
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

    //Verifica la vincita nella tavola
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

    //Manda un messaggio al vincitore e al perdente, uno diverso per ognuno
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

    //Se un utente si connette con due schede diverse, gli viene bloccato il secondo accesso
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

    //I risultati di tutte queste funzioni vengono mandate al client, che poi le visiona graficamente
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
                    numero: numero_g, //numero giocatori connessi in quella stanza
                },
            }
        }

        let old_data = letturaDati();
        let stanzaEsiste = false;

        for(let x in old_data){
            if(old_data[x]["nomeStanza"] == nomeStanza){
                stanzaEsiste = true; 
            }
            //qualora uno stesso utente riuscisse a connettersi due volte, gli blocca la creazione della seconda stanza
            if(old_data[x]["giocatori"]["giocatore1"] == nome_utente){
                socket.emit("messaggi-al-client", "stesso-utente-creazione");
                return;
            }
        }

        //se quel nome è già esistente, manda un errore
        if(stanzaEsiste){   
            socket.emit("messaggi-al-client", "errore_creazione_nome");
        }
        
        //se la stanza non esiste, viene aggiunta a stanzeAttive.json
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

                idStanza = x;

                //se la stanza ha già 2 giocatori, non ne permette la connessione al 3° utente
                if(old_data[x]["giocatori"]["numero"] == 2){
                    socket.emit("messaggi-al-client", "stanza-piena");
                    return;
                }

                //Scrittura di vari dati, e delle informazioni del secondo giocatore
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
            io.to(idStanza).emit("naviga-a-gioco");     
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
    
    //Status di nizio gioco che viene mandato dal creatore della stanza
    socket.on("inizio-gioco", (idStanza) => {   
        let utenti = inizio_turno(idStanza);  
        // VALORE DI utenti = (id, giocatore1_SID, giocatore2_SID, giocatore1_ut, giocatore2_ut, giocatore1, giocatore2);
        let colore = "rosso";
        let turno_g;
        let secondo;
        let bool_g1 = utenti[5];
        let bool_g2 = utenti[6];

        if(bool_g1){ //DEVE MANDARE A G1 CHE è IL PRIMO GIOCATORE
            io.to(utenti[1]).emit("primo-giocatore", idStanza, colore);
            turno_g = utenti[3]; //PRIMO GIOCATORE
            secondo = utenti[4]; //SECONDO GIOCATORE
            
           }
        if(bool_g2){
            io.to(utenti[2]).emit("primo-giocatore", idStanza, colore);
            turno_g = utenti[4]; //PRIMO GIOCATORE
            secondo = utenti[3]; //SECONDO GIOCATORE
            
        }

        //Manda agli utenti di chi è il turno (serve solo per capire graficamente dove mettere "è il tuo turno")
        io.to(utenti[0]).emit("turno", turno_g, secondo);

    });

      
    //Ascolta la mossa dell'utente 
    socket.on("mossa", (mossa, idStanza, board, colore, nome_utente) => {  
        
        //Aggiorna la grafica del gioco
        io.to(idStanza).emit("aggiorna-gioco", mossa, colore);
        
        //Verifica la vincita 
        if(verifica_vincita(board)){      
            let coppia = vincitore(nome_utente);

            io.to(coppia[0]).emit("vincitore", idStanza, colore);
            io.to(coppia[1]).emit("perdente", idStanza, colore);

            //Aggiorna il punteggio del vincitore
            db.update(nome_utente, function(result) {});

            //Elimina quella stanza, poichè la partita è finita
            eliminaStanzeAttive(letturaDati(), idStanza);
            return;
        }

        //Dopo ogni mossa, cambia il turno e il colore della pedina da inserire
        let utente = cambio_turno(idStanza);
        giocatoreCorrente = utente[0];
               
        colore = cambio_colore(colore);
        io.to(giocatoreCorrente).emit("giocatore-corrente", idStanza, colore);  
        io.to(idStanza).emit("turno", utente[1]);
        
    });
})
