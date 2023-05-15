import io from "socket.io-client";

// FUNZIONI PER LA MECCANICA DEL GIOCO


//ACQUISIZIONE DEL NOME UTENTE
const valorichiave = window.location.search;
const urlParams = new URLSearchParams(valorichiave);
const nome_utente = urlParams.get("nome_utente"); //RITORNA IL PRIMO VALORE NEI PARAMETRI DELL'URL 


//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Crea Stanza"
export function creaStanza() {
  const nomeStanza = document.getElementById("nomeStanza").value;
  socket.emit("crea-stanza", nomeStanza, nome_utente); //MANDA AL SERER IL NOME DELLA STANZA
}

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Unisciti"
export function uniscitiStanza() {
  const nomeStanzaUnione = document.getElementById("nomeStanzaUnione").value;
  socket.emit("unisciti-stanza", nomeStanzaUnione, nome_utente);
}


let gameOver = false;
let currColumns = [5, 5, 5, 5, 5, 5, 5];

function setGame() {
  let board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  let rows = 6;
  let columns = 7;
  gameOver = false;

  for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
          // JS
          row.push(' ');
          // HTML
          let tile = document.createElement("div");
          tile.id = r.toString() + "-" + c.toString();
          tile.classList.add("tile");
          //tile.addEventListener("click", setPiece);
          document.getElementById("board").append(tile);
      }
      board.push(row);
  }
}



export function invio_mossa(mossa,giocatore){
    
  socket.emit("mossa", mossa, giocatore);

}




//CONNESSIONE AL SERVER CHE HA PORTA 3000
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    

  const idUtenteElement = document.getElementById("id_utente");

  if (idUtenteElement){     //CONTROLLA SE IDUTENTE ESISTE, QUESTO PERCHè ABBIAMO DUE PAGINE HTML CHE USANO IL MEDESIMO SCRIPT, E NON ESISTE NELLA PAGINA gioco.html 
    idUtenteElement.innerHTML = nome_utente + `, il tuo id è: ${socket.id}`; //STAMPA DEL PROPRIO ID
  }


socket.on("messaggi-al-client", (messaggio) =>{

  if(messaggio === "errore_creazione_nome"){
    alert("Questo nome è già stato utilizzato! Scegline un altro.");
  }
  
});


//RICEZIONE DEI MESSAGGI DAL SERVER DI AVVENUTA CREAZIONE STANZA.
socket.on('stanza-creata', (idStanza, nomeStanza) => {
  //alert(`Stanza creata con successo! Codice: ${idStanza}`);
  document.getElementById("nomeStanzaUnione").value = nomeStanza;
});



// Listener per l'evento "naviga-a-gioco"
socket.on("naviga-a-gioco", (idStanza, idCreatore) => {
  const primaPagina = document.getElementById("prima-pagina");
  const secondaPagina = document.getElementById("seconda-pagina");
   // Nascondo la prima pagina
   primaPagina.style.display = "none";
  
   // Mostro la seconda pagina
   secondaPagina.style.display = "block";

  setGame();

});

socket.on("creatore", (idStanza) => {
  socket.emit("inizio-gioco", idStanza);
});


});
