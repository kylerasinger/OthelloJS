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
    //temp to set a starting position
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
    if(checkMove(this, cellIndex) == false || !running) {console.log("Illegal Move"); return; } //logic check for if it is playable
    makeMove(this, cellIndex);
    checkWinner();
    takeTurn();
}

function makeMove(cell, index){ //updateCell 
    if(currentPlayer == "B"){
        options[index] = "B";
        cell.style.backgroundColor = "white";
    }else if(currentPlayer == "W"){
        options[index] = "W";
        cell.style.backgroundColor = "black";
    }
    //add check for flippable pieces
}

function checkMove(cell, index){    
    //8 loops, if true then return true;    LEFT OFF HERE 2023-03-16 3:05PM
    let directions = [-8, -7, 1, 9, 8, 7, -1, -9];
    //                 N, NE, E,SE, S,SW,  W, NW,
    for(let i = 0; i < 8; i++){
        if(checkDir(index, directions[i]) == true){
            return true;
        }
    }

    //if skips past 8 directions, then not playable so return false;
    console.log("Illegal Move");
    return false;
}

function checkDir(pos, dir){
    console.log("direction: " + dir);
    let oppoPlayer;
    if(currentPlayer == 'B'){oppoPlayer = 'W';}
    if(currentPlayer == 'W'){oppoPlayer = 'B';}

    pos = Number(pos) + Number(dir);

    loop = true;
    let iterance = 0;
    let pieceCount = 0;
    while(loop == true){
        iterance++;
        console.log("\tLoop entrance for dir: " + dir + " | iterance " + iterance);
        if(pos < 0 || pos > 63){console.log("\t\tout of bounds | terminated. "); loop = false; break;}
        //if(iterance == 1 && options[pos] == currentPlayer){loop = false; break;}
        if(options[pos] == ''){console.log("\t\tempty cell | terminated"); loop = false;}
        if(options[pos] == oppoPlayer){pieceCount++;}
        if(options[pos] == currentPlayer && pieceCount > 0){
            console.log("\t\ttrue for index: " + pos);
            return true;
        }
        pos = Number(pos) + Number(dir);
    }

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
    currentPlayer = "B";
    for(let i = 0; i < 63; i++){
        cellIndex = i;
        cellIndex.style.backgroundColor = "green";
        
    }
}
