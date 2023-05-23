import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

var input_stanza = document.getElementById("nomeStanza");
    input_stanza.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault(); // fa in modo che alla pressione del tasto Enter, la pagina non si ricarichi
        return null;
      }
    });


var idStanzaClient;
let utente;
let secondo_giocatore;
let prima_verifica = true;

export function acquisizione_id(){
  const valorichiave = window.location.search;
  const urlParams = new URLSearchParams(valorichiave);
  const id_ = urlParams.get("id"); //RITORNA IL PRIMO VALORE NEI PARAMETRI DELL'URL 
  return id_;
}

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Crea Stanza"
export function creaStanza() {
  const nomeStanza = document.getElementById("nomeStanza").value;

  if(nomeStanza.length < 5){
    alert("Il nome deve avere almeno 5 lettere!");
    return;
  }

  socket.emit("crea-stanza", nomeStanza, utente); //MANDA AL SERER IL NOME DELLA STANZA
}

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Unisciti"
export function uniscitiStanza() {
  const nomeStanzaUnione = document.getElementById("nomeStanzaUnione").value;
  socket.emit("unisciti-stanza", nomeStanzaUnione, utente);
}

export function uniscitiStanzaSotto(nomeStanzaUnione){
  socket.emit("unisciti-stanza", nomeStanzaUnione, utente);
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
  let turno1 = document.getElementById('turno1');
  let turno2 = document.getElementById('turno2'); 

  if (r < 0) { 
      board[r][c] != ' '
      return;
  }

  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if(colore=="rosso"){
    tile.classList.add("red-piece");
    turno2.style.visibility = 'visible';
    turno1.style.visibility = 'hidden';
  }

  if(colore=="giallo"){
    tile.classList.add("yellow-piece");
    turno1.style.visibility = 'visible';
    turno2.style.visibility = 'hidden';
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
    socket.emit("mossa", mossaRicevuta, idStanzaClient, board, colore_client, utente); //emette al server le coordinate della mossa ricevuta
  }
}

function setGame() {
  // Funzione che inizializza la tavola da gioco
  let tavola = document.getElementById("board");
  tavola.style.visibility="visible";
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

  let id = acquisizione_id();
  let condizione = false;

  // CONTROLLA SE L'ID DELL'UTENTE ESISTE NEL DATABASE
  socket.on("utenti", (result) => {
    
    for(let x in result){
      if(id == x){
        utente = result[x];
        condizione = true;
        socket.emit("sono-connesso", socket.id, id);
      }
    }

    if(!condizione){
      alert("Devi essere un utente registrato per poter giocare!");
      window.location.href = "http://localhost/Progetto/Home/index.php";
    }
    
  });

  socket.on("doppia-connessione", ()=>{
    alert("Non puoi connetterti da due pagine diverse, chiudine una!");
    window.location.href = "http://localhost/Progetto/Home/index.php";
  });

  


  socket.on("messaggi-al-client", (messaggio) =>{

    if(messaggio === "errore_creazione_nome"){
      alert("Questo nome è già stato utilizzato! Scegline un altro.");
    }

    if(messaggio === "stanza-piena"){
      alert("Questa stanza è già piena!");
    }

    if(messaggio === "stesso-utente-creazione"){
      alert("Hai già creato una stanza! Non puoi crearne un'altra.");
    }

    if(messaggio == "sbagliata"){
      alert("La stanza non esiste!")
    }
    
  });


//RICEZIONE DEI MESSAGGI DAL SERVER DI AVVENUTA CREAZIONE STANZA.
socket.on('stanza-creata', (nomeStanza) => {

  
    let stanze = document.getElementById("stanze");
    stanze.style.display = "none";
  

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
    <div class="ms-2 me-auto mt-3">
      <div class="fw-bold">
        <i class="fa-solid fa-house fa-xl" style="margin-right: 10px; margin-left: -10px;"></i>${stanza}
      </div>
      <p class="gioc">Creata da ${creatore}</p>
    </div>

   
    <i class="fa-solid fa-user" style="margin-top:6.2%; margin-right: 0.8%; color: #132981;"></i>
    <span class="badge bg-primary rounded-pill" style="margin-top: 5.8%">${numero}</span>`;
  }

  else{
    nuovaStanza.innerHTML = `
    <div class="ms-2 me-auto mt-3">
      <div class="fw-bold">
        <i class="fa-solid fa-house fa-xl" style="margin-right: 10px; margin-left: -10px;"></i>${stanza}
      </div>
      <p class="gioc">Creata da ${creatore}</p>
    </div>

    <button id="${stanza}" class="btn btn-outline-danger" type="button" onclick="import('./client.js').then(module => module.uniscitiStanzaSotto('${stanza}'))">Unisciti</button>
    <i class="fa-solid fa-user" style="margin-top:6.2%; margin-right: 0.8%; color: #132981;"></i>
    <span class="badge bg-primary rounded-pill" style="margin-top: 5.8%">${numero}</span>`;
  }

  ol_html.appendChild(nuovaStanza);
  
});

socket.on('classifica', (risultato) => {
  let classifica = {}
  let array = [];
  let contatore = 0;
  Object.assign(classifica, risultato);

  for(let nome in classifica){
    array[contatore] = nome; 
    contatore += 1;
  }

  var immagine = document.createElement("img");
  immagine.src = "https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true";
  immagine.alt = "gold medal";
  immagine.className = "gold-medal";
  const top1 = document.getElementById("top1");
  top1.textContent = array[0];
  const punto1 = document.getElementById("punto1");
  punto1.textContent = classifica[array[0]];
  punto1.appendChild(immagine);

  const top2 = document.getElementById("top2");
  top2.textContent = array[1];
  const punto2 = document.getElementById("punto2");
  punto2.textContent = classifica[array[1]];

  const top3 = document.getElementById("top3");
  top3.textContent = array[2];
  const punto3 = document.getElementById("punto3");
  punto3.textContent = classifica[array[2]];

  const top4 = document.getElementById("top4");
  top4.textContent = array[3];
  const punto4 = document.getElementById("punto4");
  punto4.textContent = classifica[array[3]];

  const top5 = document.getElementById("top5");
  top5.textContent = array[4];
  const punto5 = document.getElementById("punto5");
  punto5.textContent = classifica[array[4]];

  const top6 = document.getElementById("top6");
  top6.textContent = array[5];
  const punto6 = document.getElementById("punto6");
  punto6.textContent = classifica[array[5]];
});

socket.on("avversario-disconnesso", () =>{
  alert("Il tuo avversario si è disconnesso :(");
  window.location.href = "http://localhost:8080/gioco.html?id=" + acquisizione_id();
});


// Listener per l'evento "naviga-a-gioco"
socket.on("naviga-a-gioco", () => {
  const primaPagina = document.getElementById("prima-pagina");
  const secondaPagina = document.getElementById("griglia");
  const navbar = document.getElementById("navbar");
  // Nascondo la prima parte, che è quella delle stanze
  primaPagina.style.display = "none";
  navbar.style.display="none";  
  // Mostro la seconda parte, che è quella del gioco
  secondaPagina.style.display = "grid";

  setGame();

  var head = document.getElementById('testo');
  var count = 0;

  head.addEventListener('mouseenter', function() {
    count++;
    if (count % 2 === 1) {
      head.style.color = 'rgb(255, 179, 0)';
      head.style.fontSize = '110px';
      head.style.transition = '0.5s';
    } else {
      head.style.color = 'rgb(173, 27, 27)';
      head.style.fontSize = '110px';
      head.style.transition = '0.5s';
    }
  });

  head.addEventListener('mouseleave', function() {
    head.style.color = 'white';
    head.style.fontSize = '105px';
    head.style.transition = '0.5s';
  });

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

socket.on("turno", (giocatore_attuale_ut, secondo) =>{
  
  if(prima_verifica){
    let p1 = document.getElementById("player1");
    let p2 = document.getElementById("player2");
    p1.innerHTML = giocatore_attuale_ut;
    p2.innerHTML = secondo;
    prima_verifica = false;

  }
  giocatore_attuale = giocatore_attuale_ut;
  secondo_giocatore = secondo;
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

socket.on("vincitore", () => {
  let winner = document.getElementById("winner");
  winner.innerHTML = "Hai vinto la partita! +3 in classifica!";x
  let torna = document.getElementById("nuovo");
  torna.removeAttribute("disabled");
});



socket.on("perdente", () => {
  let loser = document.getElementById("loser");
  loser.innerHTML = "Hai perso la partita! -3 in classifica!";
  let torna = document.getElementById("nuovo");
  torna.removeAttribute("disabled");
});


});
