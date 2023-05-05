import io from "socket.io-client";


export function unisciti(){
  let codice = document.getElementById("codice_stanza").value;
  alert(codice);
}


const socket = io('http://localhost:3000');
socket.on('connect', () => {
  //alert(`Sei connesso con id: ${socket.id}`);
});

socket.emit("messaggi-al-server", "try") //manda l'evento al server
