import React from 'react';
import Board from './Board';

export const TurnContext = React.createContext();
export const SetTurnContext = React.createContext();

const Game = () => {
	const [turn, setTurn] = React.useState('X');

	return (
		<div>
			<h1>Player {turn}, its your turn</h1>
			<TurnContext.Provider value={turn}>
					<SetTurnContext.Provider value={setTurn}>
							<Board />
					</SetTurnContext.Provider>
			</TurnContext.Provider>
		</div>
	)
};

export default Game;
