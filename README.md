# Forza 4 Online

Il progetto Forza 4 Online è un gioco creato da Giulio Di Gregorio e Mattia Maffongelli 
(Ingegneria Informatica @ [Sapienza](https://www.uniroma1.it/it/pagina-strutturale/home)). 
Siamo orgogliosi di presentare un gioco familiare e divertente, realizzato con la potenza di HTML, JavaScript, Node.js, PHP, CSS e Bootstrap.

## Funzionalità

• **Gioca in locale sullo stesso Computer!**: Gioca con i tuoi amici direttamente sullo stesso Monitor. 

• **Gioca Online!**: Gioca con i tuoi amici o con chiunque nel mondo nella sezione MultiPlayer.

## Prerequisiti

Per eseguire questo progetto sul proprio dispositivo, è necessario avere installato sul proprio sistema Node.js e npm.
Inoltre, sarà necessario l'utilizzo dell'applicazione [XAMPP](https://www.apachefriends.org/it/index.html) per gestire il database MySQL, e l'hosting in locale del sito con Apache. La struttura del database da utilizzare, è allegata all'interno della main-page Forza4, con il nome di "register_database.sql". 
È fortemente consigliato di avere almeno 8 utenti registrati nel database, che può essere effettuata direttamente dal comando in Home-Page.

## Installazione

I comandi che vengono elencati di seguito, devono essere eseguiti rispettivamente nelle cartelle "client" e "server", ognuno in due terminali diversi.
I due terminali, installerano le dipendenze necessarie, e faranno partire per la cartella client il server [snowpack](https://www.snowpack.dev/), mentre per la cartella server [nodemon](https://nodemon.io/).

### Installazione --> client

Nella directory client (Forza4/game/Multiplayer/client, esegui il comando seguente per installare le dipendenze e avviare l'applicazione.

`npm install;
npm start`

### Installazione --> server

Nella directory server (Forza4/game/Multiplayer/server, esegui il comando seguente per installare le dipendenze e avviare l'applicazione.

`npm install;
npm run devStart`

### Contributi
Siamo sempre aperti a miglioramenti. Se hai suggerimenti su come possiamo migliorare il gioco, sentiti libero di fare un fork del progetto e creare una pull request.
Autori

    Giulio Di Gregorio
    Mattia Maffongelli
