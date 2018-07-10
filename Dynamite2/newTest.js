gamestate = { 'rounds': [{ 'p1': 'R', 'p2': 'S' }, { 'p1': 'R', 'p2': 'W' },{ 'p1': 'R', 'p2': 'D' },{ 'p1': 'R', 'p2': 'P' }, { 'p1': 'R', 'p2': 'R' }, { 'p1': 'R', 'p2': 'S' }, { 'p1': 'R', 'p2': 'P' }] };

 
p2Moves = ['R','P','P','D','D','W','R'];

function getAmountOfMove(p2Moves, move) {
    //return the number of times 'move' occurs in 'p2Moves'
    if (!['R', 'P', 'S', 'W', 'D'].includes(move)) { //if "move" is not a valid move
        throw ('Error: invalid move passed to getAmountOfMoves. ' + move + ' is not a recognised move.')
    }
    let moveCount = p2Moves.reduce(function (accumulator, val) {
        return accumulator + (val === move);
    }, 0);
    return moveCount;
}

function getp2MoveProfile(p2Moves) {
    //return an object containing the amount of time a player has played each move, indexed by move letter code
    let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
    let p2MoveProfile = {};
    for (let i=0; i<5; i++) {
        let currentMove = possibleMoves[i];
        p2MoveProfile[currentMove] = getAmountOfMove(p2Moves, currentMove);
    }
    return p2MoveProfile;
}

function findMaxOfArray(array) {
    //return the maximum number in array
    var max = array.reduce((oldVal, newVal) => Math.max(oldVal, newVal));
    if (isNaN(max)) {
        throw ('Error: can\'t find max of a non-numeric array');
    }
    return max;
}
function getp2MoveProfileArray(p2Moves) {
    //return an array containint the amount of times a player has played each move in order of possibleMoves
    let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
    let p2MoveProfileArr = [];
    for (let i=0; i<5; i++) {
        let currentMove = possibleMoves[i];
        p2MoveProfileArr.push( getAmountOfMove(p2Moves, currentMove) );
    }
    return p2MoveProfileArr;
}
function getp2MoveProfileObject(p2Moves) {
    //return an object containing the amount of times a player has played each move, indexed by move letter code adn the number of moves
    let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
    let p2MoveProfileObj = {};
    for (let i=0; i<5; i++) {
        let currentMove = possibleMoves[i];
        p2MoveProfileObj[currentMove] = getAmountOfMove(p2Moves, currentMove);;
    }
    return p2MoveProfileObj;
}

function isEnemyConstant(p2Moves) {
    //how likely is the enemy to be just playing one move repeatedly. Return [the most popular move, what fraction of moves it is].
    let p2MoveProfileObj = getp2MoveProfileObject(p2Moves);
    let currentMostPopularMove = 'R';
    let currentMax = 0;
    for (var move in p2MoveProfileObj) {
        let currentfrequency = p2MoveProfileObj[move];
        if (currentfrequency > currentMax) {
            currentMax = currentfrequency;
            currentMostPopularMove = move;
        }
    }
    let mostPopularMoveFraction = currentMax / p2Moves.length;
    return [mostPopularMoveFraction, currentMostPopularMove]
}

console.log(p2Moves)
console.log ( isEnemyConstant(p2Moves) )