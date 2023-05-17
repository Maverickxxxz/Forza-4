var mysql = require('mysql'); 

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "register_database",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");


    con.query("SELECT email FROM utente WHERE nome_utente='Mavarick'", function (err, result) {
        if (err) throw err;
        console.log(result[0].email); // stampa tutte le righe
   });

});