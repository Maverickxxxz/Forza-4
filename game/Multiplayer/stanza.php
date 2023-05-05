<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stanza.css">
    <script src="./client/script.js"></script>
    <title>Stanze di Chat</title>
</head>
<body>
    <div class="container">
        <h1>Stanze di Chat</h1>
        <div class="room-list">
            <!-- Qui verranno aggiunte le stanze dinamicamente -->
        </div>
        <form id="create-room-form">
            <input type="text" id="room-name" placeholder="Nome della stanza">
            <button type="submit">Crea stanza</button>
        </form>
        <form id="join-room-form">
            <input type="text" id="room-code" placeholder="Codice della stanza">
            <button type="submit">Unisciti</button>
        </form>
    </div>
</body>
</html>
