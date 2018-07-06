//strategy 
//only use 99 dynamite so that the enemy bot will keep throwing water
//if the enemy has used 99 dynamite stop throwing water
//watch out for a mirroring strategy and a counter-mirroring strategy
//watch out for patttern analysis
//Have an intentional gap where you don’t use dynamite. If your opponent was trying to predict your dynamites they will throw some water balloons and you will win.
//Start delaying your dynamite throws if your opponent starts water ballooning you
//Don’t Be Too Predictable
//write more than one strategy
//create special exceptions for tie responses
//analyse enemy water and dynamite use
//run several strategies over the last few hunder moves adn choose the best one
//consider how much dynamite to use relative to how close to the end of the game we are

class Bot {
    constructor() {
        this.dynamiteCount = 0;
    }

    makeMove(gamestate) {
        let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
        let myMove = 'R';
        let enemyConstant = isEnemyConstant(getArrayOfP2Moves(gamestate));
        if (enemyConstant[0]>0.9) {
            return 'S';
        }
        if (myMove === 'D') {
            this.dynamiteCount += 1;
        }
        return myMove;
    }
}
module.exports = new Bot();


/////analysis of the enemy strategy/////////////////////////////////////////
function enemyStrategyAnalyser() {

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



/////useful functions on the gamestate and p2Moves//////////////////////////
function getArrayOfP2Moves(gamestate) {
    //returns an array of the moves P2 has played so far
    let p2Moves = [];
    let roundsSoFar = gamestate.rounds;
    for (let i = 0; i < roundsSoFar.length; i++) {
        p2Moves.push(roundsSoFar[i].p2);
    }
    return p2Moves;
}

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


/////useful array tools//////////////////////////////////////////////////////
function findMaxOfArray(array) {
    //return the maximum number in a numeric array
    var max = array.reduce((oldVal, newVal) => Math.max(oldVal, newVal));
    if (isNaN(max)) {
        throw ('Error: can\'t find max of a non-numeric array');
    }
    return max;
}