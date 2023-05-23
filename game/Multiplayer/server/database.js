var mysql = require('mysql'); 

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "register_database",
});


function connectToDatabase(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connesso al database!");
  });
}


function query_classifica(callback){
  con.query(`select nome_utente, puntiClassifica from utente order by puntiClassifica DESC`, function(err, result) {
    if (err) throw err;

    let punti = {};
    
    for(i = 0;i < 6;i++){
      let nome_utente = result[i].nome_utente;
      let puntiClassifica = result[i].puntiClassifica;
      punti[nome_utente] = puntiClassifica;     
    }
    callback(punti);
  });
}


function aggiornamento(nome_utente, callback){
  con.query(`UPDATE utente SET puntiClassifica = puntiClassifica + 3 where nome_utente = "${nome_utente}"`, function(err, result) {
    if (err) throw err;
    callback(result);
  })
}

function penalizzazione_utente(nome_utente, callback){
  con.query(`UPDATE utente SET puntiClassifica = puntiClassifica - 3 where nome_utente = "${nome_utente}"`, function(err, result) {
    if (err){null};
    callback(result);
  })
}

function utenti_registrati(callback){
  con.query(`select ID,nome_utente from utente`, function(err, result) {
    if (err) throw err;

    let utenti = {};
    
    for(let i = 0; i < result.length;i++){
      utenti[result[i].ID] = result[i].nome_utente;
    }
    callback(utenti);
  });
}


module.exports = {
  connect: connectToDatabase,
  classifica: query_classifica,
  update: aggiornamento,
  utenti: utenti_registrati,
  penalizzazione: penalizzazione_utente
}
