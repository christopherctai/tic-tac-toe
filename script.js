const playGameButton = document.querySelector('.play-game');
const form = document.querySelector('.player-info');
const submitButton = document.querySelector('.submit');
const nextRoundButton = document.querySelector('.next-round');
const playAgainButton = document.querySelector('.play-again');
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
        for (let i = 0; i < 9; i++) {
            gameboard[i] = '';
        }
        displayGameboard();
    }

    return {
        gameboard: gameboard,
        displayGameboard: displayGameboard,
        clearBoard: clearBoard
    }
})();

form.classList.add('hidden');
infoBanner.classList.add('hidden');
nextRoundButton.classList.add('hidden');
playAgainButton.classList.add('hidden');
gameboard.displayGameboard();


const gameplay = (function() {
    let playerOne;
    let playerTwo;
    let symbol = 'X';

    function playGame() {
        // play a game
        // first, gather player information and assign info to players 
        _getPlayerInfo(0);
    }

    function _getPlayerInfo(i) {
        // get the name of the players 
        form.classList.toggle('hidden');
        playGameButton.classList.toggle('hidden');
        submitButton.addEventListener('click', () => {
            _submitPlayerInfo(i);
            i++;
        });
    }

    function _submitPlayerInfo(i) {
        // submit the player info using factory function
        let player = playerInput.value;
        if (i === 1) {
            playerTwoTitle.textContent = `${player}:`;
            playerTwo = playerFactory(player, 'O');
            form.classList.toggle('hidden');
            infoBanner.classList.toggle('hidden');
            infoBanner.textContent = `${playerOne.name}'s turn!`
            _prepareBoard();
        } else {
            playerOneTitle.textContent = `${player}:`;
            playerOne = playerFactory(player, 'X');
            playerInput.value = '';
            labelBanner.textContent = 'Enter Player 2 Name'
        } 
    }

    function _prepareBoard() {
        // selects all squares and attaches an event listener 
        // if squares are clicked, runs the addMove function
        let squares = document.querySelectorAll('.square');
        let squaresArray = Array.from(squares);
        squaresArray.forEach((square) => {
            square.addEventListener('click', () => {
                addMove(squaresArray.indexOf(square));
            });
        });
    }

    function addMove(i) {
        // add a move to the gameboard
        // then display the gameboard 
        if (gameboard.gameboard[i]) {
            return;
        } else if (symbol === 'X') {
            gameboard.gameboard[i] = symbol;
            infoBanner.textContent = `${playerTwo.name}'s Turn!`;
            checkWinRound(symbol);
            symbol = 'O';
        } else if (symbol === 'O') {
            gameboard.gameboard[i] = symbol;
            infoBanner.textContent = `${playerOne.name}'s Turn!`;
            checkWinRound(symbol);
            symbol = 'X';
        }
        gameboard.displayGameboard();
        _prepareBoard();
    }

    function checkWinRound(symbol) {
        // check to see if a player won the round
        // check rows
        for (let i = 0; i < 9; i += 3) {
            if (gameboard.gameboard[i] === symbol 
                && gameboard.gameboard[i + 1] === symbol
                && gameboard.gameboard[i + 2] === symbol) {
                declareVictoryRound(symbol);
                checkWinGame();
                return;
            } 
        }

        // check columns
        for (let i = 0; i < 3; i++) {
            if (gameboard.gameboard[i] === symbol 
                && gameboard.gameboard[i + 3] === symbol
                && gameboard.gameboard[i + 6] === symbol) {
                declareVictoryRound(symbol);
                checkWinGame();
                return;
            }
        }

        // check diagonals
        if (gameboard.gameboard[0] === symbol 
            && gameboard.gameboard[4] === symbol
            && gameboard.gameboard[8] === symbol) {
            declareVictoryRound(symbol);
            checkWinGame();
            return;
        }
        if (gameboard.gameboard[2] === symbol
            && gameboard.gameboard[4] === symbol
            && gameboard.gameboard[6] === symbol) {
            declareVictoryRound(symbol);
            checkWinGame();
            return;
        }
    }

    function declareVictoryRound(symbol) {
        // declare that a player has won the round
        if (symbol === 'X') {
            infoBanner.textContent = `${playerOne.name} wins the round!`
            playerOneScore.textContent++;
            nextRoundButton.classList.remove('hidden');
        } else {
            infoBanner.textContent = `${playerTwo.name} wins the round!`
            playerTwoScore.textContent++;
            nextRoundButton.classList.remove('hidden');
        }
    }

    function checkWinGame() {
        // check to see if a player won the game 
        if (playerOneScore.textContent === '3') {
            infoBanner.textContent = `${playerOne.name} wins the entire game!`
            nextRoundButton.classList.add('hidden');
            playAgainButton.classList.remove('hidden');
        } else if (playerTwoScore.textContent === '3') {
            infoBanner.textContent = `${playerTwo.name} wins the entire game!`
            nextRoundButton.classList.add('hidden');
            playAgainButton.classList.remove('hidden');
        }
    }
    
    nextRoundButton.addEventListener('click', () => {
        resetRound();
    })

    playAgainButton.addEventListener('click', () => {
        resetGame();
    })

    function resetRound() {
        // reset the game board to play the next round 
        nextRoundButton.classList.add('hidden');
        infoBanner.textContent = `${playerOne.name}'s Turn!`;
        gameboard.clearBoard();
        _prepareBoard();
        symbol = 'X';
    }

    function resetGame() {
        // reset the entire game and form to play again
        playAgainButton.classList.add('hidden');
        gameboard.clearBoard();
        symbol = 'X';
        infoBanner.textContent = `${playerOne.name}'s Turn!`; 
        playerOneScore.textContent = '0';
        playerTwoScore.textContent = '0';
        _prepareBoard();
    }

    return {
        playGame: playGame,
        checkWinRound: checkWinRound,
        checkWinGame: checkWinGame, 
        reset: resetRound
    }
})()


const playerFactory = (name, symbol) => {
    return {name} 
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