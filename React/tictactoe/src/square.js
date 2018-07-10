import React from 'react';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} id={props.idValue}>
            {props.value}
        </button>
    );
}

export default Square;