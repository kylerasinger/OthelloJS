//left off on makeMove(). 
//stop the makeMove() and checkMove() from moving over the side borders

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
    /*both direction and rowCheck will be needed for 
    any sort of movement on the board. Thus it is global.*/
let directions = [-8, -7, 1, 9, 8, 7, -1, -9];
//                 N, NE, E,SE, S,SW,  W, NW,
let rowCheck = [ 1,  1, 0,-1,-1,-1,  0,  1,];
//               N, NE, E,SE, S,SW,  W, NW,
let currentPlayer = "B";
let running = false;


startGame();


function startGame(){ //initializeGame
    //temp to set a starting position
    running = true;
    //default board. could later make a board loader.
    cells[27].style.backgroundColor = "white";
    cells[28].style.backgroundColor = "black";
    cells[35].style.backgroundColor = "black";
    cells[36].style.backgroundColor = "white";
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn` ;
    console.log("Current Player: "+currentPlayer);
}

function cellClicked(){ 
    const cellIndex = this.getAttribute("cellIndex");
    if(checkMove(cellIndex) == false || !running) {console.log("Illegal Move"); return; } //logic check for if it is playable
    if(checkMove(cellIndex) == true ){makeMove(this, cellIndex);}
    checkWinner();
    takeTurn();
}

function makeMove(cell, index){ //updateCell 
    console.log("placeMove():")
    let oppoPlayer;
    let oppoColour;
    let currentColour;
    if(currentPlayer == 'B'){oppoPlayer = 'W'; oppoColour = "white"; currentColour = "black";}
    if(currentPlayer == 'W'){oppoPlayer = 'B'; oppoColour = "blacK"; currentColour = "white";}
    loop1 = true;
    loop2 = true;
    let pieceCount = 0;
    let pos = index;

    let addCount = 0;
    for(let i = 0; i < 8; i++){//runs all 8 directions
        console.log("\tFor loop direction: "+directions[i]);
        pos = index;
        console.log("\tForward loop start: ");
        pieceCount = 0;

        loop1 = true;
        while(loop1==true){
            loop2 = true;
            pos = Number(pos) + Number(directions[i]);
            if(pos < 0 || pos > 63){loop1 = false;}
            console.log("\t\tPOS: "+pos);
            if(options[pos] == ''){console.log("\t\tEmpty spot | Terminated at "+pos); loop1 = false;}
            console.log("\t\toppoPlayer = "+oppoPlayer + " |options[pos] = "+options[pos]);
            if(options[pos] == oppoPlayer){console.log("\t\tAdd to piece count");pieceCount++};
            if(options[pos] == currentPlayer && pieceCount > 0){
            console.log("\t\tFlanking piece found");
                //flanking piece found, time to get back and flip places
                while(loop2==true){
                    console.log("\t\tReversing loop start:");
                    pos = Number(pos) - Number(directions[i])
                    console.log("\t\t\tPOS: "+pos);
                    if(options[pos] == oppoPlayer){
                        console.log("\t\t\toptions[pos]"+options[pos]);
                        options[pos] = currentPlayer;
                        console.log("\t\t\toptions[pos]"+options[pos]);
                        cell.style.backgroundColor = currentColour;
                        cells[pos].style.backgroundColor = currentColour;
                    }else{
                        options[pos] = currentPlayer;
                        cell.style.backgroundColor = currentColour;
                        cells[pos].style.backgroundColor = currentColour;
                        loop2 = false;
                    }
                }
                loop1 = false;
            }
        }
    }
}

function checkMove(index){    
    //8 loops, if true then return true;    LEFT OFF HERE 2023-03-16 3:05PM
    if(options[index] != ''){console.log("occupied"); return false;}
    for(let i = 0; i < 8; i++){
        if(checkDir(index, directions[i], rowCheck[i]) == true){
            return true;
        }
    }
    //if skips past 8 directions, then not playable so return false;
    console.log("Illegal Move");
    return false;
}

function checkDir(pos, dir, rowCheck){
    console.log("direction: " + dir);
    let oppoPlayer;
    if(currentPlayer == 'B'){oppoPlayer = 'W';}
    if(currentPlayer == 'W'){oppoPlayer = 'B';}

    let initialRow = Math.trunc((Number(pos))/8);
    pos = Number(pos) + Number(dir);
    let newRow = Math.trunc((Number(pos))/8);
    let diffRow;

    loop = true;
    let iterance = 0;
    let pieceCount = 0;
    while(loop == true){
        iterance++;
        console.log("\tLoop entrance for dir: " + dir + " | iterance " + iterance);
        //check for row skipping
        diffRow = Math.trunc(initialRow - newRow);
        console.log("\t\tdiffRow = " + diffRow + " | rowCheck = " + rowCheck + " | initialRow = " + initialRow + " | newRow = " + newRow);
        if(diffRow != rowCheck){console.log("\t\trow skip | terminated. "); loop = false; break;}
        //check for out of bounds
        if(pos < 0 || pos > 63){console.log("\t\tout of bounds | terminated. "); loop = false; break;}
        //check for if next spot is its own color
        if(iterance == 1 && options[pos] == currentPlayer){console.log("\t\tfriendly next ");loop = false; break;}
        //check for empty cell
        if(options[pos] == ''){console.log("\t\tempty cell | terminated"); loop = false;}
        //checks for its own end piece and makes sure that there are opposite pieces between.
        if(options[pos] == currentPlayer && pieceCount > 0){
            console.log("\t\ttrue for index: " + pos);
            return true;
        }
        //checks for opposite pieces in a direction
        if(options[pos] == oppoPlayer){pieceCount++;}
        // //checks for its own end piece and makes sure that there are opposite pieces between.
        // if(options[pos] == currentPlayer && pieceCount > 0){
        //     console.log("\t\ttrue for index: " + pos);
        //     return true;
        // }
        pos = Number(pos) + Number(dir);
    }

}

function takeTurn(){ //changePlayer
    currentPlayer = (currentPlayer == "B") ? "W" : "B";
    statusText.textContent = `${currentPlayer}'s turn`;
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
    statusText.textContent = currentPlayer + "'s turn";
    for(let i = 0; i < 63; i++){
        cells[i].style.backgroundColor = "green";
        if(i == 27 || i == 36){cells[i].style.backgroundColor = "white"}
        if(i == 28 || i == 35){cells[i].style.backgroundColor = "black"}
    }
}
