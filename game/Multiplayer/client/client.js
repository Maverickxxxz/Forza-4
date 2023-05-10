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

//CONNESSIONE AL SERVER CHE HA PORTA 3000
const socket = io('http://localhost:3000');

socket.on('connect', () => {

    
  
    function setWinner(r, c) {
      let winner = document.getElementById("winner");
      if (board[r][c] == playerRed) {
          winner.innerText = "Red Wins";             
      } else {
          winner.innerText = "Yellow Wins";
      }
      gameOver = true;
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
  
    function setPiece() {
      if (gameOver) {
          return;
      }
  
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
  
      checkWinner();
  }
  
    function setGame() {
      let board = [];
      let currColumns = [5, 5, 5, 5, 5, 5, 5];
      let rows = 6;
      let columns = 7;
      let gameOver = false;
    
      for (let r = 0; r < rows; r++) {
          let row = [];
          for (let c = 0; c < columns; c++) {
              // JS
              row.push(' ');
              // HTML
              let tile = document.createElement("div");
              tile.id = r.toString() + "-" + c.toString();
              tile.classList.add("tile");
              tile.addEventListener("click", setPiece);
              document.getElementById("board").append(tile);
          }
          board.push(row);
      }
    }
    

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
  alert(`Stanza creata con successo! Codice: ${idStanza}`);
  document.getElementById("nomeStanzaUnione").value = nomeStanza;
});



// Listener per l'evento "naviga-a-gioco"
socket.on("naviga-a-gioco", (idStanza) => {
  const primaPagina = document.getElementById("prima-pagina");
  const secondaPagina = document.getElementById("seconda-pagina");
  //primaPagina.style.display = "none";
  secondaPagina.style.display = "block";
  setGame();
});

 

});
