const gameboard = (function() {
    let gameboard = []; 

    
    function addMove() {
        // add a move to the gameboard
        // then display the gameboard 
    }
    
    function displayGameboard() {
        // display the gameboard 
        // check to see if a player won the game 
    }

    function clearBoard() {
        // clear the gameboard 
    }

    return {
        addMove: addMove,
        clearBoard: clearBoard
    }
})();


const gameplay = (function() {
    function playGame() {
        // play a game
    }

    function getPlayerInfo() {
        // get the name of the players 
    }
    
    function playerTurn() {
        // give a player a turn 
    }

    function checkWinRound() {
        // check to see if a player won the round
    }

    function checkWinGame() {
        // check to see if a player won the game 
    }
})()


const personFactory = (name, symbol) => {
    let score = 0;
    function playMove() {
        // add a move to the gameboard 
    }
    function declareVictory() {
        // check score and declare victory
    }
    return {name, symbol, playMove, declareVictory}
}



/* 

BRAINSTORMING 

Gameboard is an array
Gameboard is inside gameboard object. Module 
what do I want my gameboard to do?
-store the current moves
-shouldn't allow players to play on occupied squares 
-clear 

players should ALSO be in objects. Factory functions
What attributes should the players have? 
-play a piece 
-choose a name 


Controlling the flow of the game. Module 
-will alternate between player one and player two 
-will check for a winner 
*/ 