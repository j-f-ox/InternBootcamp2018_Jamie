import React, { Component } from 'react';
import Square from './square';

class Board extends Component {

    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            key={i}
            onClick={() => this.props.onClick(i)}
            idValue={'square'+i}
        />
        );
    }

    render() {
        const numbers = [0,1,2];
        let boardJSXOutput = [];
        numbers.map((row) => {
            const squaresInThisRowList = numbers.map((col) => {
                return this.renderSquare(row*3 + col);
            });
            boardJSXOutput.push(<div className="board-row" key={row}>{squaresInThisRowList}</div>);
        });
        return <div>{boardJSXOutput}</div>;
    }
}

export default Board;