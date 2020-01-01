import React from 'react';
import Board from './components/Board/index';
import ISquares from './model/squares';
import { calculateWinner } from './utils/calculateWinner';

const Game = () => {
    const [history, setHistory] = React.useState<ISquares[]>([{squares: Array(9).fill(null)}]);
    const [nextStep, setNextStep] = React.useState<boolean>(false);
    const [stepNumber, setStepNumber] = React.useState<number>(0);

    // Game component gets complete controll for Board component.
    const handleClick = (i: number) => {
        const thatTimeHistory = history.slice(0, stepNumber + 1);
        const currentSquares: ISquares = thatTimeHistory[thatTimeHistory.length - 1];
        if (!currentSquares.squares[i] && !calculateWinner(currentSquares.squares)) {
            const newSquares = currentSquares.squares.slice();
            newSquares[i] = nextStep ? 'X' : 'O';
            setHistory(thatTimeHistory.concat([{squares: newSquares}]));
            setNextStep(!nextStep);
            setStepNumber(stepNumber + 1);
        }
    }

    // function used to do time travel
    const goBackTo = (step: number) => {
        setStepNumber(step);
        setNextStep((step % 2) === 1);
    }

    // render necessary variables
    const currentSquares: ISquares = history[stepNumber];
    const winner: string | null = calculateWinner(currentSquares.squares);

    const movesHistory = history.map((squares, index) => {
        const desc: string = index ? 'Go to move #' + index : 'Go to game start';
        return (
            <li key={index}>
                <button onClick={() => goBackTo(index)}>{desc}</button>
            </li>
        );
    })

    let status: string;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next step player is ' + (nextStep ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={currentSquares.squares}
                    onClick={(i: number) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{movesHistory}</ol>
            </div>
        </div>
    );
};

export default Game;
