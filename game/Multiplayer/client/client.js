import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


// FUNZIONI PER LA MECCANICA DEL GIOCO


//ACQUISIZIONE DEL NOME UTENTE
var idStanzaClient;
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

let giocatoreCorrente = false;
let board = [];
let currColumns = [5, 5, 5, 5, 5, 5, 5];
let gameOver = false;
let mossaRicevuta;

export function aggiornaGioco(mossa){

  let r = mossa[0];
  let c = mossa[1];
  /*r = currColumns[c]; 

  if (r < 0) { 
      board[r][c] != ' '
      return;
  }*/

  let tile = document.getElementById(r.toString() + "-" + c.toString());
  
  tile.classList.add("red-piece");
  tile.classList.add("yellow-piece");

  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array

  //checkWinner();*/
}


export function mossa() {
  
  //if (gameOver) {
  //    return;
  //}

  if(giocatoreCorrente==false){
    alert("Non è ancora il tuo turno, aspetta!");
  }

  else{
    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    mossaRicevuta = [r,c];
    socket.emit("mossa", mossaRicevuta, idStanzaClient);

    console.log("CURR CULUMNS:", currColumns[c]);
    console.log("BOARD: ", board[r][c]);
  }

}

function setGame() {

  board = [];
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
          tile.addEventListener("click", mossa);
          document.getElementById("board").append(tile);
      }
      board.push(row);
  }
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

  if(messaggio === "stanza-piena"){
    alert("Questa stanza è già piena!");
  }
  
});


//RICEZIONE DEI MESSAGGI DAL SERVER DI AVVENUTA CREAZIONE STANZA.
socket.on('stanza-creata', (idStanza, nomeStanza) => {
  //alert(`Stanza creata con successo! Codice: ${idStanza}`);
  document.getElementById("nomeStanzaUnione").value = nomeStanza;
});



// Listener per l'evento "naviga-a-gioco"
socket.on("naviga-a-gioco", () => {
  const primaPagina = document.getElementById("prima-pagina");
  const secondaPagina = document.getElementById("seconda-pagina");
   // Nascondo la prima pagina
   primaPagina.style.display = "none";  
   // Mostro la seconda pagina
   secondaPagina.style.display = "block";
   console.log(socket.id);

  setGame();
});

socket.on("creatore", (idStanza) => {
  socket.emit("inizio-gioco", idStanza); //In modo che solo il "creatore" manda un solo segnale di inizio-gioco, altrimenti ne avremmo 2
  idStanzaClient = idStanza;
  console.log("IDSTANZA: ", idStanzaClient);
});

socket.on("aggiorna-gioco", (mossa) =>{
  aggiornaGioco(mossa);
});


socket.on("giocatore-corrente", (idStanza) => {
  giocatoreCorrente = true;
  idStanzaClient = idStanza;
});

socket.on("giocatore-non-corrente", (idStanza) => {
  giocatoreCorrente = false;
  idStanzaClient = idStanza;
});

});
