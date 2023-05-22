var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.
var intervalId;

document.addEventListener('DOMContentLoaded', function() {
    var head = document.getElementById('testo');
    var count = 0;
  
    head.addEventListener('mouseenter', function() {
      count++;
      if (count % 2 === 1) {
        head.style.color = 'rgb(255, 179, 0)';
        head.style.fontSize = '110px';
        head.style.transition = '0.5s';
      } else {
        head.style.color = 'rgb(173, 27, 27)';
        head.style.fontSize = '110px';
        head.style.transition = '0.5s';
      }
    });
  
    head.addEventListener('mouseleave', function() {
      head.style.color = 'white';
      head.style.fontSize = '105px';
      head.style.transition = '0.5s';
    });
  });
  


function setGame() {
    let tavola = document.getElementById("board");
    tavola.style.visibility="visible";
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            tavola.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    let turno1 = document.getElementById('turno1');
    let turno2 = document.getElementById('turno2');

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        turno2.style.visibility = 'visible';
        turno1.style.visibility = 'hidden';

    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        turno1.style.visibility = 'visible';
        turno2.style.visibility = 'hidden';
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function newGame(){
    location.reload();
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    let btn = document.getElementById("nuovo");
    let btn2 = document.getElementById("nuovo2");
    if (board[r][c] == playerRed) {
        winner.innerHTML = "Ha vinto il <span id='colore'>rosso</span>!";             
    } else {
        winner.innerHTML = "Ha vinto il <span id='colore2'>giallo</span>!";
    }
    btn.removeAttribute('disabled');
    btn2.removeAttribute('disabled');
    clearInterval(intervalId);

    gameOver = true;
}


function startTimer(){
    let start = document.getElementById("nuovo3");
    setGame();
    var container = document.getElementById("contimer");
    var startTime = Date.now();

    function updateTimer() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;

        var minutes = Math.floor(elapsedTime / 60000);
        var seconds = Math.floor((elapsedTime % 60000) / 1000);
        var milliseconds = Math.floor((elapsedTime % 1000) / 10);

        container.innerText = minutes.toString().padStart(2, '0') + ':' +
                              seconds.toString().padStart(2, '0') + ':' +
                              milliseconds.toString().padStart(2, '0');
    }

    intervalId = setInterval(updateTimer, 30);
    start.disabled = true;
}
