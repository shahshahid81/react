import Player from './components/Player';
import Log from './components/Log';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD_STATE = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function generateGameBoard(gameTurns) {
  const gameBoard = INITIAL_GAME_BOARD_STATE.map((row) => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const currentPlayer = deriveCurrentPlayer(gameTurns);

  const gameBoard = generateGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // const [currentPlayer, setCurrentPlayer] = useState('X');

  function handlePlayerNameChange(symbol, playerName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: playerName,
      };
    });
  }

  function handlePlayerChange(rowIndex, colIndex) {
    // setCurrentPlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveCurrentPlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          // Shouldn't use this because we are depending on another state which is not predictable
          // player: activePlayer

          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players['X']}
            symbol="X"
            isActive={currentPlayer === 'X'}
            handlePlayerNameChange={handlePlayerNameChange}
          />
          <Player
            name={players['O']}
            symbol="O"
            isActive={currentPlayer === 'O'}
            handlePlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver handleRestart={handleRestart} winner={winner} />
        )}
        <GameBoard
          gameBoard={gameBoard}
          handlePlayerChange={handlePlayerChange}
          currentPlayer={currentPlayer}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
