export default function GameBoard({
  // currentPlayer,
  handlePlayerChange,
  gameBoard,
}) {
  // const [gameBoard, setGameBoard] = useState(intialGameBoardState);

  // function handleSelectSquare(rowIndex, colIndex) {
  // setGameBoard((previousGameBoardState) => {
  //   // The below approach is not recommended because since arrays and objects are reference type, this will immediately update the state instead of scheduling it and there will be no difference between previous and current one.
  //   // It is recommended to create a copy of the state and then mutate it.
  //   // previousGameBoardState[rowIndex][colIndex] = 'X';
  //   // return previousGameBoardState;

  //   const newGameBoardState = [
  //     ...previousGameBoardState.map((row) => [...row]),
  //   ];
  //   newGameBoardState[rowIndex][colIndex] = currentPlayer;
  //   return newGameBoardState;
  // });

  //   handlePlayerChange();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled={playerSymbol}
                  onClick={() => handlePlayerChange(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
