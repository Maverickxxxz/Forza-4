import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => {
  displayMessage(`Sei connesso con id: ${socket.id}`);
  
});

function displayMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const paragraph = document.createElement('p');
  paragraph.textContent = message;
  messagesDiv.appendChild(paragraph);
}

socket.emit("prova-server", 10, "ciao", {a: "a"}) //manda l'evento al server

