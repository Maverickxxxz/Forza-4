import io from "socket.io-client";

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Crea Stanza"
export function creaStanza() {
  const nomeStanza = document.getElementById("nomeStanza").value;
  socket.emit("crea-stanza", nomeStanza); //MANDA AL SERER IL NOME DELLA STANZA
}

//FUNZIONE CHE SI AVVIA CON IL BOTTONE "Unisciti"
export function uniscitiStanza() {
  const nomeStanzaUnione = document.getElementById("nomeStanzaUnione").value;
  socket.emit("unisciti-stanza", nomeStanzaUnione);
}

//CONNESSIONE AL SERVER CHE HA PORTA 3000
const socket = io('http://localhost:3000');
socket.on('connect', () => {
  document.getElementById("id_utente").innerHTML = `Il tuo id è: ${socket.id}`; //STAMPA DEL PROPRIO ID
});

socket.on("messaggi-al-client", messaggio =>{
  alert(messaggio);
})


//RICEZIONE DEI MESSAGGI DAL SERVER DI AVVENUTA CREAZIONE STANZA.
socket.on('stanza-creata', (nomeStanza, idStanza) => {
  alert(`Stanza creata con successo! Codice: ${idStanza}`);
  document.getElementById("codice_stanza").value = nomeStanza;
  socket.emit("messaggi-al-server", "STANZA CREATA") //INVIO DI CONFERMA AL SERVER
});

socket.on('stanza-giusta', (nomeStanza, idStanza) => {
  alert(`Ti sei unito alla stanza: ${nomeStanza}`);
});