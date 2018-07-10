import React from 'react';

function Square(props) {
    const squareClasses = props.isSquareSelected ? 'square winningSquare' : 'square';
    return (
        <button className={squareClasses} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;