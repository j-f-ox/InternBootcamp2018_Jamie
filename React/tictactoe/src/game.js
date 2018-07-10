import React, { Component } from 'react';
import Board from './board';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            winningSquares: null, //the 3 squares in a row for which the game was won
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    makeSelectedMoveBold(move) {
        let previouslySelectedMoves = document.getElementsByClassName("selectedMove");
        if (previouslySelectedMoves.length > 0) {
            previouslySelectedMoves[0].classList.remove("selectedMove");
        }
        let currentlySelectedMove = document.getElementById("moveNumber" + move);
        if (currentlySelectedMove) { //i.e. if the button already exists
            currentlySelectedMove.classList.add("selectedMove");
        }
    }

    updateWinningSquares(currentStep) {
        if (this.state.winningRoundNumber!==currentStep) {
            let previousWinningSquares = document.getElementsByClassName("winningSquare");
            const len = previousWinningSquares.length;
            for (let i=0; i<len; i++) {
                previousWinningSquares[0].classList.remove("winningSquare");
            }
            return;
        }
        const winningSquareIndices = this.state.winningSquares;
        if (winningSquareIndices) {
            for (let i=0; i<3; i++) {
                let currentWinningSquare = 'square' + winningSquareIndices[i];
                document.getElementById(currentWinningSquare).classList.add("winningSquare");
            }

        }
    }

    render() {
        const history = this.state.history;
        const currentStep = this.state.stepNumber;
        const current = history[currentStep];
        this.makeSelectedMoveBold(currentStep);
        const winnerData = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            let moveID = 'moveNumber'.concat(move);

            return (
                <li key={move}>
                    <button class="goToMoveButton selectedMove"
                        onClick={() => {
                            this.jumpTo(move);
                            this.makeSelectedMoveBold(move);
                        }}
                        id={moveID}
                    >
                        {desc}</button>
                </li>
            );
        })

        let status;
        if (winnerData) {
            status = 'Winner: ' + winnerData[0];
            let currentStep = this.state.stepNumber;
            this.state.winningSquares = winnerData[1];
            this.state.winningRoundNumber = currentStep;
        } else if (this.state.stepNumber < 9) {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = "It's a draw. Better luck next time!";
        }
        this.updateWinningSquares(this.state.stepNumber);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />

                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], [a,b,c]];
        }
    }
    return null;
}

export default Game;