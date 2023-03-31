//left off on makeMove(). 
//North and south makeMove() is currently broken


const cells = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");
const cellStatus = document.querySelector("#cellStatus");
const restartBtn = document.querySelector("#restartBtn");
const testBoardOne = document.querySelector("#testBoardOne");
const testBoardTwo = document.querySelector("#testBoardTwo");

let options =
    ["", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "W", "B", "", "", "", 
    "", "", "", "B", "W", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", ];
    pieces[27].style.backgroundColor = "white";
    pieces[28].style.backgroundColor = "black";
    pieces[35].style.backgroundColor = "black";
    pieces[36].style.backgroundColor = "white";
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
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    testBoardOne.addEventListener("click", loadTestBoardOne);
    testBoardTwo.addEventListener("click", loadTestBoardTwo);
    statusText.textContent = `${currentPlayer}'s turn` ;

    //show playable moves
    showPlayableMoves();

    console.log("Current Player: "+currentPlayer);
}

function cellClicked(){ 
    const cellIndex = this.getAttribute("cellIndex");
    const pieceIndex = this.getAttribute("pieceIndex");
    if(checkMove(cellIndex) == false || !running) {console.log("Illegal Move"); return; } //logic check for if it is playable
    if(checkMove(cellIndex) == true ){hidePlayableMoves(); makeMove(pieces[cellIndex], cellIndex);} //if(checkMove(cellIndex) == true ){makeMove(this, cellIndex);}
    checkWinner();
    takeTurn();
    showPlayableMoves();
}

function makeMove(piece, index,){ //updateCell 
    // console.log("makeMove():")
    let oppoPlayer;
    let oppoColour;
    let currentColour;
    if(currentPlayer == 'B'){oppoPlayer = 'W'; oppoColour = "white"; currentColour = "black";}
    if(currentPlayer == 'W'){oppoPlayer = 'B'; oppoColour = "blacK"; currentColour = "white";}
    loop1 = true;
    loop2 = true;
    let pieceCount = 0;
    let pos;

    //vars used for row checking
    let initialRow = Math.trunc((Number(index))/8);
    let newRow = initialRow;
    let diffRow;
    let iterance = 0;

    for(let i = 0; i < 8; i++){//runs all 8 directions
        // console.log("\tFor loop direction: "+directions[i]);
        pos = index;
        // console.log("\tForward loop start: ");
        pieceCount = 0;
        iterance = 0;
        let previousRow = initialRow;

        loop1 = true;
        while(loop1==true){
            iterance++;
            // console.log("\t\t\titerance: " + iterance);
            loop2 = true;

            // previousPos = pos;
            pos = Number(pos) + Number(directions[i]); //each loop run, this moves pos to the next position in the board array.
            
            if(iterance != 1){
                previousRow = newRow;
            }
            // previousRow = newRow;
            newRow = Math.trunc(Number(pos)/8);
            
            diffRow = Math.trunc(Number(previousRow) - Number(newRow));

            if(i == 3 || i == 7){diffRow = Math.trunc(Number(previousRow) - Number(newRow));}
            if(i == 0 || i == 4){diffRow = Math.trunc(Number(previousRow) - Number(newRow));}
            // console.log("\t\tdiffRow = " + diffRow + " | rowCheck = " + rowCheck[i] + 
                // " | initialRow = " + initialRow + " | newRow = " + newRow + " | previousRow = " + previousRow);
            if(pos < 0 || pos > 63){loop1 = false;}
            if(i != 0 && i != 4){   
                if(diffRow != rowCheck[i]){console.log("\t\trow skip | terminated. "); loop = false; break;}
            }

            // console.log("\t\tPOS: "+pos);

            if(options[pos] == ''){/*console.log("\t\tEmpty spot | Terminated at "+pos);*/ loop1 = false;}
            // console.log("\t\toppoPlayer = "+oppoPlayer + " |options[pos] = "+options[pos]);
            if(options[pos] == oppoPlayer){/*console.log("\t\tAdd to piece count")*/;pieceCount++};
            if(options[pos] == currentPlayer && pieceCount > 0){
            // console.log("\t\tFlanking piece found");
                //flanking piece found, time to get back and flip places
                while(loop2==true){
                    // console.log("\t\tReversing loop start:");
                    pos = Number(pos) - Number(directions[i])
                    // console.log("\t\t\tPOS: "+pos);
                    if(options[pos] == oppoPlayer){
                        // console.log("\t\t\toptions[pos]"+options[pos]);
                        options[pos] = currentPlayer;
                        // console.log("\t\t\toptions[pos]"+options[pos]);
                        piece.style.backgroundColor = currentColour; //this is causing the first cell to change its background
                        pieces[pos].style.backgroundColor = currentColour;
                    }else{
                        options[pos] = currentPlayer;
                        piece.style.backgroundColor = currentColour;
                        pieces[pos].style.backgroundColor = currentColour;
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
    if(options[index] != ''){/*console.log("occupied");*/ return false;}
    for(let i = 0; i < 8; i++){
        if(checkDir(index, directions[i], rowCheck[i]) == true){
            return true;
        }
    }
    //if skips past 8 directions, then not playable so return false;
    // console.log("Illegal Move");
    return false;
}

function checkDir(pos, dir, rowCheck){
    // console.log("direction: " + dir);
    let oppoPlayer;
    if(currentPlayer == 'B'){oppoPlayer = 'W';}
    if(currentPlayer == 'W'){oppoPlayer = 'B';}

    let initialRow = Math.trunc((Number(pos))/8);
    pos = Number(pos) + Number(dir);
    let newRow = Math.trunc((Number(pos))/8);
    let diffRow = 0;

    loop = true;
    let iterance = 0;
    let pieceCount = 0;
    while(loop == true){
        iterance++;
        // console.log("\tLoop entrance for dir: " + dir + " | iterance " + iterance);
        //check for row skipping
        diffRow = Math.trunc(Number(initialRow) - Number(newRow));
        // console.log("\t\tdiffRow = " + diffRow + " | rowCheck = " + rowCheck + " | initialRow = " + initialRow + " | newRow = " + newRow);
        if(diffRow != rowCheck){/*console.log("\t\trow skip | terminated. ");*/ loop = false; break;}
        //check for out of bounds
        if(pos < 0 || pos > 63){/*console.log("\t\tout of bounds | terminated. ");*/ loop = false; break;}
        //check for if next spot is its own color
        if(iterance == 1 && options[pos] == currentPlayer){/*console.log("\t\tfriendly next ");*/ loop = false; break;}
        //check for empty cell
        if(options[pos] == ''){/*console.log("\t\tempty cell | terminated");*/ loop = false;}
        //checks for its own end piece and makes sure that there are opposite pieces between.
        if(options[pos] == currentPlayer && pieceCount > 0){
            // console.log("\t\ttrue for index: " + pos);
            return true;
        }
        //checks for opposite pieces in a direction
        if(options[pos] == oppoPlayer){pieceCount++;}
        // //checks for its own end piece and makes sure that there are opposite pieces between.
        pos = Number(pos) + Number(dir);
    }
}

function checkRowSkip(dir, rowDifference){
    if(rowCheck[dir] == rowDifference){
        return false;
    }
    return true;
}

function showPlayableMoves(){
    for(i = 0; i < 64; i++){
        if(checkMove(i) == true){
            pieces[i].style.borderColor = "black";
        }
    }
}

function hidePlayableMoves(){
    console.log("HIDING PLAYABLE MOVES");
    for(i = 0; i < 64; i++){
        if(pieces[i].style.borderColor == "black"){
            pieces[i].style.borderColor = "green";
        }
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
        // console.log(numBlack);
        // console.log(numWhite);
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
    for(let i = 0; i < 64; i++){
        pieces[i].style.backgroundColor = "green";
        // if(i == 27 || i == 36){cells[i].style.backgroundColor = "white"}
        if(i == 27 || i == 36){pieces[i].style.backgroundColor = "white"}
        // if(i == 28 || i == 35){cells[i].style.backgroundColor = "black"}
        if(i == 28 || i == 35){pieces[i].style.backgroundColor = "black"}        
    }
    hidePlayableMoves();
    showPlayableMoves();
}

function loadTestBoardOne(){
    console.log("load test board one");
    options =
    ["", "", "", "", "", "", "B", "", 
    "", "", "", "", "", "", "", "W", 
    "", "", "", "", "", "B", "", "", 
    "", "W", "B", "", "", "", "W", "", 
    "", "W", "", "", "", "B", "W", "", 
    "", "", "B", "", "", "", "", "", 
    "W", "", "", "", "", "", "", "", 
    "", "B", "", "", "", "", "", "", ];
    currentPlayer = "B";
    statusText.textContent = currentPlayer + "'s turn";
    for(let i = 0; i < 63; i++){
        pieces[i].style.backgroundColor = "green";
        if(i == 6 || i == 57 || i == 26 || i == 37 || i == 42 || i == 21){pieces[i].style.backgroundColor = "black"}
        if(i == 15 || i == 48 || i == 25 || i == 38 || i == 33 || i == 30){pieces[i].style.backgroundColor = "white"}
        if(i == 24 || i == 39){pieces[i].style.backgroundColor = "yellow"}
    }
    hidePlayableMoves();
    showPlayableMoves();
}

function loadTestBoardTwo(){
    console.log("load test board two");
    options =
    ["", "B", "", "", "", "", "", "", 
    "W", "", "", "", "", "B", "W", "", 
    "", "", "", "", "", "", "W", "", 
    "", "", "", "", "", "B", "", "", 
    "", "", "B", "", "", "", "", "", 
    "", "W", "", "", "", "", "", "", 
    "", "W", "B", "", "", "", "", "W", 
    "", "", "", "", "", "", "B", "", ];
    currentPlayer = "B";
    statusText.textContent = currentPlayer + "'s turn";
    for(let i = 0; i < 63; i++){
        pieces[i].style.backgroundColor = "green";
        if(i == 1 || i == 13 || i == 50 || i == 62 || i == 29 || i == 34){pieces[i].style.backgroundColor = "black"}
        if(i == 8 || i == 14 || i == 55 || i == 49 || i == 22 || i == 41){pieces[i].style.backgroundColor = "white"}
        if(i == 15 || i == 48 ){pieces[i].style.backgroundColor = "yellow"}
    }
    hidePlayableMoves();
    showPlayableMoves();
}