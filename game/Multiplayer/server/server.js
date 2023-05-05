const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})


//Ascolto del server di messaggi in arrivo
io.on('connection', socket => {
    console.log(socket.id)
    socket.on("messaggi-al-server", (string, room) =>{

        if(room==""){
            alert("Inserisci la stanza!")
            return;
        }

        else{
            socket.broadcast.to(room).emit("messaggi-al-server", string)
        }

        console.log(string)
    })
})

