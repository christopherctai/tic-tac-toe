const playGameButton = document.querySelector('.play-game');
const form = document.querySelector('.player-info');
const submitButton = document.querySelector('.submit');
let labelBanner = document.querySelector('#player-name');
let playerInput = document.querySelector('#player');
let infoBanner = document.querySelector('.info-banner');
let playerOneTitle = document.querySelector('.player-one');
let playerTwoTitle = document.querySelector('.player-two');
let playerOneScore = document.querySelector('.player-one-score');
let playerTwoScore = document.querySelector('.player-two-score');
let gameArea = document.querySelector('.gameboard');

playGameButton.addEventListener('click', () => {
    gameplay.playGame();
});


const gameboard = (function() {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    
    function displayGameboard() {
        // display the gameboard 
        gameArea.textContent = "";
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.textContent = gameboard[i];
            gameArea.append(square);
        }
    }
    function clearBoard() {
        // clear the gameboard 
    }
    return {
        gameboard: gameboard,
        displayGameboard: displayGameboard,
        clearBoard: clearBoard
    }
})();

form.classList.add('hidden');
infoBanner.classList.add('hidden');
gameboard.displayGameboard();


const gameplay = (function() {
    let playerOne;
    let playerTwo;
    let _playX = true;

    function playGame() {
        // play a game
        // first, gather player information and assign info to players 
        _getPlayerInfo();
        
        // second, play one round of tic-tac-toe 
        _playRound();

        // third, evaluate who ultimately wins a game to three 
    }

    function _getPlayerInfo() {
        // get the name of the players 
        form.classList.toggle('hidden');
        playGameButton.classList.toggle('hidden');
        let i = 0; 
        submitButton.addEventListener('click', () => {
            _submitPlayerInfo(i);
            i++;
        });
    }

    function _submitPlayerInfo(i) {
        let player = playerInput.value;
        if (i === 0) {
            playerOneTitle.textContent = `${player}:`;
            playerOne = playerFactory(player, 'X');
            playerInput.value = '';
            labelBanner.textContent = 'Enter Player 2 Name'
        } else {
            playerTwoTitle.textContent = `${player}:`;
            playerTwo = playerFactory(player, 'O');
            form.classList.toggle('hidden');
            infoBanner.classList.toggle('hidden');
        } 
    }

    function _playRound() {
        let squares = document.querySelectorAll('.square');
        let squaresArray = Array.from(squares);
        squaresArray.forEach((square) => {
            square.addEventListener('click', () => {
                addMove(squaresArray.indexOf(square));
                console.log(squaresArray.indexOf(square));
            });
        });
    }

    function addMove(i) {
        // add a move to the gameboard
        // then display the gameboard 
        if (gameboard.gameboard[i]) {
            _playRound();
        } else if (_playX) {
            gameboard.gameboard[i] = 'X';
            _playX = false;
        } else if (!_playX) {
            gameboard.gameboard[i] = 'O';
            _playX = true;
        }
        gameboard.displayGameboard();
        _playRound();
    }

    function checkWinRound() {
        // check to see if a player won the round
    }

    function checkWinGame() {
        // check to see if a player won the game 
    }

    function reset() {
        // reset the game board and everything 
    }

    return {
        playGame: playGame,
        checkWinRound: checkWinRound,
        checkWinGame: checkWinGame, 
        reset: reset
    }
})()


const playerFactory = (name, symbol) => {
    let _score = 0;
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