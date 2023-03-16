const cells = document.querySelectorAll(".cell");
const cellStatus = document.querySelector("#cellStatus");
const restartBtn = document.querySelector("#restartBtn");

let options =
    ["", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", ];

let currentPlayer = "B";
let running = false;

startGame();


function startGame(){ //initializeGame
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = ${currentPlayer}"s turn" ;
}

function cellClicked(){ 

}

function makeMove(cell, index){ //updateCell 

}

function takeTurn(){ //changePlayer

}

function checkWinner(){

}

function restartGame(){

}