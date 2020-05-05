import React from 'react';
import Cells from './Cells';
import {TurnContext, SetTurnContext} from './Game';

function Board() {
	const [boardState, setBoardState] = React.useState(new Array(9).fill(null));
  const [history, setHistoryState] = React.useState([]);
	const turn = React.useContext(TurnContext);
  const setTurn = React.useContext(SetTurnContext);
  let boardArr = [...boardState];
  console.log(boardArr);

   function declareWinner(board) {
		const conditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for(let i = 0; i < conditions.length; i++){
			const [first, second, third] = conditions[i]

			if (board[first] && board[second] === board[first] && board[third] === board[first]) {
				return board[first];
			}
		}
		return null;
	}

	const winner = declareWinner(boardState)
	let status;
	if(winner) {
		status = `The winner is ${winner}`
	}

	function clickHandler(num) {
		if (!winner && !boardState[num]) {
      const prevHistory = [...history]
      const currentBoard = [...boardState];

      currentBoard[num] = turn;
      prevHistory.push(currentBoard);

      setBoardState(currentBoard);
      setHistoryState(prevHistory);

      setTurn((turn === 'X') ? 'O' : 'X');
		}
	}

  function moveTravel(move) {
    const boardMoveFrame = [...history];
    setBoardState(boardMoveFrame[move]);
  }

  function moveToStart() {
    setBoardState(new Array(9).fill(null));
    setHistoryState([]);
  }

  const gameMoves = history.map((move) => {
    const travel = move ? `Go to move ${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => moveTravel(move)}>{travel}</button>
      </li>
    );
  });

	return (
		<div className='board'>
		 <h3>{status}</h3>
     <div className="game-info">
      <ol>
        <button onClick={moveToStart}>Beginning</button>
        {gameMoves}
      </ol>
      </div>
			<div className="rows">
				<Cells click={() => clickHandler(0)} value={boardState[0]}  boardArr={boardArr} setBoardState={setBoardState}/>
				<Cells click={() => clickHandler(1)} value={boardState[1]}/>
				<Cells click={() => clickHandler(2)} value={boardState[2]}/>
			</div>
			<div className="rows">
				<Cells click={() => clickHandler(3)} value={boardState[3]}/>
				<Cells click={() => clickHandler(4)} value={boardState[4]}/>
				<Cells click={() => clickHandler(5)} value={boardState[5]}/>
			</div>
			<div className="rows">
				<Cells click={() => clickHandler(6)} value={boardState[6]}/>
				<Cells click={() => clickHandler(7)} value={boardState[7]}/>
				<Cells click={() => clickHandler(8)} value={boardState[8]}/>
			</div>
		</div>

	)
}

export default Board;
