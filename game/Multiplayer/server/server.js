const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
})


//Ascolto del server di messaggi in arrivo
io.on('connection', socket => {
    console.log(socket.id)
    socket.on("prova-server", (number,string,obj) =>{
        console.log(number,string,obj)
    })
})

