var mysql = require('mysql'); 

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "register_database",
});



  con.connect(function(err) {
    if (err) throw err;
    console.log("Connesso al database!");
  });



  /*
    con.query(`select nome_utente, puntiClassifica from utente order by puntiClassifica DESC`, function(err, result) {
      if (err) throw err;
  
      let punti = {};
  
      for(i = 0;i < 6;i++){
        let nome_utente = result[i].nome_utente
        let puntiClassifica = result[i].puntiClassifica;
        punti[nome_utente] = puntiClassifica;     
      }
      console.log(result);
    });
  




connectToDatabase();
/*
function query_classifica(callback){
  con.query(`select nome_utente, puntiClassifica from utente order by puntiClassifica DESC`, function(err, result) {
    if (err) throw err;

    let punti = {};

    for(i = 0;i < 6;i++){
      let nome_utente = result[i].nome_utente
      let puntiClassifica = result[i].puntiClassifica;
      punti[nome_utente] = puntiClassifica;     
    }
    callback(punti);
  });
}

function aggiornamento(nome_utente, callback){
  con.query(`UPDATE utente SET puntiClassifica = puntiClassifica + 1 where nome_utente = "${nome_utente}"`, function(err, result) {
    if (err) throw err;
    callback(result);
  })
}

function utenti_registrati(callback){
  con.query(`select ID from utente`, function(err, result) {
    if (err) throw err;

    let utenti = [];
    for(let i = 0; i < result.length;i++){
      let utente = result[i].ID;
      utenti.push(utente);
    }
    callback(utenti);
  });
}

/*
module.exports = {
  connect: connectToDatabase,
  classifica: query_classifica,
  update: aggiornamento,
  utenti: utenti_registrati
}*/
