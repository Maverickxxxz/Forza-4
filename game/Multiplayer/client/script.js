import io from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => {
  alert(`Sei connesso con id: ${socket.id}`);
  
});

socket.emit("prova-server", 10, "ASD", {a: "a"}) //manda l'evento al server

