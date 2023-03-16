const cells = document.querySelectorAll(".cell");
const cellStatus = document.querySelector("#cellStatus");
const restartBtn = document.querySelector("#restartBtn");

let options =
    ["", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "W", "B", "", "", "", 
    "", "", "", "B", "W", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", ];

let currentPlayer = "B";
let running = false;


startGame();


function startGame(){ //initializeGame
    cells[27].style.backgroundColor = "white";
    cells[28].style.backgroundColor = "black";
    cells[35].style.backgroundColor = "black";
    cells[36].style.backgroundColor = "white";
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn` ;
    running = true;
}

function cellClicked(){ 
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running) {return;} //logic check for if it is playable
    //^^will be if checkMove() == false
    makeMove(this, cellIndex);
    checkWinner();
    takeTurn();
}

function makeMove(cell, index){ //updateCell 
    options[index] = currentPlayer; 
    if(currentPlayer == "B"){
        cell.style.backgroundColor = "white";
    }else{
        cell.style.backgroundColor = "black";
    }
    //add check for flippable pieces
}

function checkMove(cell, index){
    //8 loops, if true then return true;

    //if skips past 8 loops, then not playable so return false;
}


function takeTurn(){ //changePlayer
    statusText.textContent = `${currentPlayer}'s turn`;
    currentPlayer = (currentPlayer == "B") ? "W" : "B";
}

function checkWinner(){ 
    let roundWon = false;
    let winner = "";
    let numWhite = 0;
    let numBlack = 0;
    if(!options.includes("")){
        roundWon = true;
        options.forEach(function(element) {
            if(element == "B") {numBlack++};
            if(element == "W") {numWhite++};
        });
        console.log(numBlack);
        console.log(numWhite);
        if(numWhite > numBlack){winner = "White";}
        if(numBlack > numWhite){winner = "Black";}
        if(numWhite == numBlack){console.log("Game is a draw"); winner = false;}
    }
    
}

function restartGame(){
    options =
    ["", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "W", "B", "", "", "", 
    "", "", "", "B", "W", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", ];
    for(let i = 0; i < 63; i++){
        cellIndex = i;
        cellIndex.style.backgroundColor = "green";
        
    }
}
