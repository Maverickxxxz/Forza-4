import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';


//ACQUISIZIONE DEL NOME UTENTE
var idStanzaClient;
export function acquisizione_utente(){
  const valorichiave = window.location.search;
  const urlParams = new URLSearchParams(valorichiave);
  const nome_utente = urlParams.get("nome_utente"); //RITORNA IL PRIMO VALORE NEI PARAMETRI DELL'URL 
  return nome_utente;
}

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Crea Stanza"
export function creaStanza() {
  const nomeStanza = document.getElementById("nomeStanza").value;
  socket.emit("crea-stanza", nomeStanza, acquisizione_utente()); //MANDA AL SERER IL NOME DELLA STANZA
}

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Unisciti"
export function uniscitiStanza() {
  const nomeStanzaUnione = document.getElementById("nomeStanzaUnione").value;
  socket.emit("unisciti-stanza", nomeStanzaUnione, acquisizione_utente());
}

export function uniscitiStanzaSotto(nomeStanzaUnione){
  console.log(nomeStanzaUnione);
  socket.emit("unisciti-stanza", nomeStanzaUnione, acquisizione_utente());
}


let giocatoreCorrente = false;
let board = [];
let currColumns = [5, 5, 5, 5, 5, 5, 5];
let mossaRicevuta;
let colore_client;

export function aggiornaGioco(mossa, colore){

  colore_client = colore; // COLORE ROSSO!! ALL'INIZIO PER TUTTI E DUE I CLIENT

  let r = mossa[0];
  let c = mossa[1];
  r = currColumns[c]; 

  if (r < 0) { 
      board[r][c] != ' '
      return;
  }

  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if(colore=="rosso"){
    tile.classList.add("red-piece");
  }

  if(colore=="giallo"){
    tile.classList.add("yellow-piece");
  }

  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array
}


export function mossa() {
  
  if(giocatoreCorrente==false){
    alert("Non è ancora il tuo turno, aspetta!");
  }

  
  else{
    // prende le coordinate del click
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(colore_client=="rosso"){
      board[r][c] = "rosso";
    }
  
    if(colore_client=="giallo"){
      board[r][c] = "giallo";
    }
  

    mossaRicevuta = [r,c];
    socket.emit("mossa", mossaRicevuta, idStanzaClient, board, colore_client); //emette al server le coordinate della mossa ricevuta
  }
}

function setGame() {
  // Funzione che inizializza la tavola da gioco
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  let rows = 6;
  let columns = 7;

    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
          row.push(' ');
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

  if (acquisizione_utente() == "null"){     //CONTROLLA SE IDUTENTE ESISTE, QUESTO PERCHè ABBIAMO DUE PAGINE HTML CHE USANO IL MEDESIMO SCRIPT, E NON ESISTE NELLA PAGINA gioco.html 
    alert("Devi prima registrarti per poter giocare!"); //STAMPA DEL PROPRIO ID
    window.location.href = "http://localhost/Progetto/Home/" ;
  }


socket.on("messaggi-al-client", (messaggio) =>{

  if(messaggio === "errore_creazione_nome"){
    alert("Questo nome è già stato utilizzato! Scegline un altro.");
  }

  if(messaggio === "hai vinto!!"){
    alert("Hai vinto!!");
    console.log("HAI VINTO!");
  }

  if(messaggio === "stanza-piena"){
    alert("Questa stanza è già piena!");
  }

  if(messaggio === "stesso-utente"){
    alert("Hai già creato una stanza! Non puoi unirti ad un'altra.");
  }

  if(messaggio === "stesso-utente-creazione"){
    alert("Hai già creato una stanza! Non puoi crearne un'altra.");
  }
  
});


//RICEZIONE DEI MESSAGGI DAL SERVER DI AVVENUTA CREAZIONE STANZA.
socket.on('stanza-creata', (idStanza, nomeStanza) => {
  document.getElementById("nomeStanzaUnione").value = nomeStanza;
  let div_crea = document.getElementById("crea");
  let div_unisciti = document.getElementById("unisciti");
  let div_attesa = document.getElementById("attesa");
  div_crea.style.display = "none";
  div_unisciti.style.display = "none";
  div_attesa.style.display = "flex";
});

socket.on('stanze-attive', (stanza, creatore, numero) => {
  let ol_html = document.getElementById("creatore_lista");

  let nuovaStanza = document.createElement('li');
  nuovaStanza.className = "list-group-item d-flex justify-content-between align-items-start";

  if(numero==2){
    nuovaStanza.innerHTML = `
    <div class="ms-2 me-auto">
      <div class="fw-bold">
        <i class="fa-solid fa-house" style="margin-right: 10px; margin-left: -10px;"></i>${stanza}
      </div>
      <p class="gioc">Creata da ${creatore}</p>
    </div>

   
    <i class="fa-solid fa-user" style="margin-top:1.3%; margin-right: 0.8%; color: #132981;"></i>
    <span class="badge bg-primary rounded-pill" style="margin-top: 1.2%">${numero}</span>`;
  }

  else{
    nuovaStanza.innerHTML = `
    <div class="ms-2 me-auto">
      <div class="fw-bold">
        <i class="fa-solid fa-house" style="margin-right: 10px; margin-left: -10px;"></i>${stanza}
      </div>
      <p class="gioc">Creata da ${creatore}</p>
    </div>

    <button id="${stanza}" class="btn btn-outline-danger" type="button" onclick="import('./client.js').then(module => module.uniscitiStanzaSotto('${stanza}'))">Unisciti</button>
    <i class="fa-solid fa-user" style="margin-top:1.3%; margin-right: 0.8%; color: #132981;"></i>
    <span class="badge bg-primary rounded-pill" style="margin-top: 1.2%">${numero}</span>`;
  }

  ol_html.appendChild(nuovaStanza);
  
});


// Listener per l'evento "naviga-a-gioco"
socket.on("naviga-a-gioco", () => {
  const primaPagina = document.getElementById("prima-pagina");
  const secondaPagina = document.getElementById("seconda-pagina");
  // Nascondo la prima pagina
  primaPagina.style.display = "none";  
  // Mostro la seconda pagina
  secondaPagina.style.display = "block";

  setGame();
});

socket.on("creatore", (idStanza) => {
  socket.emit("inizio-gioco", idStanza); //In modo che solo il "creatore" manda un solo segnale di inizio-gioco, altrimenti ne avremmo 2
  idStanzaClient = idStanza;
});

socket.on("aggiorna-gioco", (mossa, colore) =>{
  aggiornaGioco(mossa, colore);
});

socket.on("primo-giocatore", (idStanza, colore) =>{
  giocatoreCorrente = true;
  idStanzaClient = idStanza;
  colore_client = colore;
});


socket.on("giocatore-corrente", (idStanza, colore) => {
  colore_client = colore;
  giocatoreCorrente = true;
  idStanzaClient = idStanza;
});

socket.on("giocatore-non-corrente", (idStanza) => {
  giocatoreCorrente = false;
  idStanzaClient = idStanza;
});



});
