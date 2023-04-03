const cells = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");
const cellStatus = document.querySelector("#cellStatus");
const restartBtn = document.querySelector("#restartBtn");
const togglePlayer = document.querySelector("#toggleBtn");
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
let playerMode = 0; //0 is vs AI : 1 is vs another player


startGame();


function startGame(){
    running = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    togglePlayer.addEventListener("click", togglePlayerMode);
    restartBtn.addEventListener("click", restartGame);
    testBoardOne.addEventListener("click", loadTestBoardOne);
    testBoardTwo.addEventListener("click", loadTestBoardTwo);

    statusText.textContent = `${currentPlayer}'s turn` ;

    showPlayableMoves();
}

function cellClicked(){ 
    const cellIndex = this.getAttribute("cellIndex");
    const pieceIndex = this.getAttribute("pieceIndex");
    if(checkMove(cellIndex) == false || !running){return;} //logic check for if it is playable
    if(checkMove(cellIndex) == true ){hidePlayableMoves(); makeMove(pieces[cellIndex], cellIndex);} //if(checkMove(cellIndex) == true ){makeMove(this, cellIndex);}
    checkWinner();
    takeTurn();
    showPlayableMoves();
}

function makeMove(piece, index,){
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

    for(let i = 0; i < 8; i++){ //8 directions
        pos = index;
        pieceCount = 0;
        iterance = 0;
        loop1 = true;

        let previousRow = initialRow;

        while(loop1==true){
            iterance++;
            loop2 = true;

            //row checking
            pos = Number(pos) + Number(directions[i]); 
            if(iterance != 1){previousRow = newRow;}
            newRow = Math.trunc(Number(pos)/8);
            diffRow = Math.trunc(Number(previousRow) - Number(newRow));
            if(i == 3 || i == 7){diffRow = Math.trunc(Number(previousRow) - Number(newRow));}
            if(i == 0 || i == 4){diffRow = Math.trunc(Number(previousRow) - Number(newRow));}
            if(i != 0 && i != 4){   
                if(diffRow != rowCheck[i]){loop = false; break;}
            }

            //the rest of the checks
            if(pos < 0 || pos > 63){loop1 = false;}
            if(options[pos] == ''){loop1 = false;}
            if(options[pos] == oppoPlayer){pieceCount++;}

            if(options[pos] == currentPlayer && pieceCount > 0){
                //flanking piece found, time to get back and flip places
                while(loop2==true){
                    pos = Number(pos) - Number(directions[i])
                    if(options[pos] == oppoPlayer){
                        options[pos] = currentPlayer;
                        piece.style.backgroundColor = currentColour;
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
    if(options[index] != ''){return false;}
    for(let i = 0; i < 8; i++){
        if(checkDir(index, directions[i], rowCheck[i]) == true){
            return true;
        }
    }
    return false;
}

function checkDir(pos, dir, rowCheck){
    let oppoPlayer;
    if(currentPlayer == 'B'){oppoPlayer = 'W';}
    if(currentPlayer == 'W'){oppoPlayer = 'B';}
    loop = true;
    let iterance = 0;
    let pieceCount = 0;

    let initialRow = Math.trunc((Number(pos))/8);
    let newRow = Math.trunc((Number(pos))/8);
    let diffRow = 0;
    let previousRow = initialRow;

    while(loop == true){
        iterance++;

        //check for row skipping
        pos = Number(pos) + Number(dir);
        if(iterance != 1){previousRow = newRow};
        newRow = Math.trunc(Number(pos)/8);
        diffRow = Math.trunc(Number(previousRow) - Number(newRow));
        if(diffRow != rowCheck){loop = false; break;}

        //other checks that actually work
        if(pos < 0 || pos > 63){loop = false; break;} //check for out of bounds
        if(iterance == 1 && options[pos] == currentPlayer){loop = false; break;} //check for if next spot is its own color
        if(options[pos] == ''){loop = false;} //check for empty cell
        if(options[pos] == currentPlayer && pieceCount > 0){return true;}         //checks for its own end piece and makes sure that there are opposite pieces between.
        if(options[pos] == oppoPlayer){pieceCount++;} //checks for opposite pieces in a direction
    }
}

function checkRowSkip(dir, rowDifference){
    if(rowCheck[dir] == rowDifference){
        return false;
    }
    return true;
}

function showPlayableMoves(){
    let moveCounter = 0;
    for(i = 0; i < 64; i++){
        if(checkMove(i) == true){
            moveCounter++;
            pieces[i].style.borderColor = "black";
        }
    }
    if(moveCounter == 0){
        console.log("there is a winner, game over");
    }
}

function hidePlayableMoves(){
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
        if(numWhite > numBlack){winner = "White";}
        if(numBlack > numWhite){winner = "Black";}
        if(numWhite == numBlack){console.log("Game is a draw"); winner = false;}
    }
    
}

function restartGame(){
    console.log("Restarting Game");
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
        if(i == 27 || i == 36){pieces[i].style.backgroundColor = "white"}
        if(i == 28 || i == 35){pieces[i].style.backgroundColor = "black"}        
    }
    hidePlayableMoves();
    showPlayableMoves();
}

    function loadTestBoardOne(){
        console.log("LoadTestBoardOne");
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
        console.log("LoadTestBoardTwo");
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

function togglePlayerMode(){
    console.log("toggle.");
    if(playerMode = 0){togglePlayer.textContent = "Currently VS Player"; playerMode = 1;}
    else if(playerMode = 1){togglePlayer.textContent = "Currently VS Bot"; playerMode = 0;}
}