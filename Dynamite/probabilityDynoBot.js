//note: this assumes that you are player 1
//chooses moves based on assuming that p2 will play the move that they've played the most so far
//this bot is probabilityBot with Dynamite
class Bot {
    constructor() {
        this.dynamiteCount = 0;
        this.enemyHasDynamite = true;
        //this.playerHasDynamite = true; //goes to false when the bot runs out of dynamite
    }

    getAmountOfMoves(gamestate, move) {
        //return the number of times p2 has played the given move
        if (!['R','P','S','W','D'].includes(move)) { //if "move" is not a valid move
            throw ('Error: invalid move passed to getAmountOfMoves. '+move+' is not a recognised move.')
        }
        let roundsSoFar = gamestate.rounds;
        let moveCount = 0;
        for (let i=0; i<roundsSoFar.length; i++) {
            if (roundsSoFar[i].p2 === move) {
                moveCount += 1;
            }
        }
        if (move==='D' && moveCount===100) { //!NOT ideal: reassigns every round
            this.enemyHasDynamite = false;
        }
        return moveCount;
    }

    getEnemyMoveProbabilities(gamestate) {
        //return the probabilities of p2 playing each move up until now in the game in the order of possibleMoves
        let possibleMoves = ['R','P','S','W','D'];
        let moveProbabilities = {};
        let totalNumberOfMoves = gamestate.rounds.length;
        for (let i=0; i<5; i++) {
            let currentMove = possibleMoves[i];
            let numberOfCurrentMove = this.getAmountOfMoves(gamestate, currentMove);
            moveProbabilities[currentMove] = numberOfCurrentMove/totalNumberOfMoves; //divide number of moves by total moves to get probabilities
        }
        return moveProbabilities;
    }

    makeMove(gamestate) {
        if (gamestate.rounds.length < 1) {
            return 'R' //play rock on the first turn
        }
        let possibleMoves = ['R','P','S','W','D'];
        let enemyMoveProbs = this.getEnemyMoveProbabilities(gamestate);
        let mostProbableEnemyMove = Object.keys(enemyMoveProbs).reduce( function(prevVal, newVal){ return enemyMoveProbs[prevVal] > enemyMoveProbs[newVal] ? prevVal : newVal });
        if (mostProbableEnemyMove === 'R') {
            return 'P';
        }
        if (mostProbableEnemyMove === 'P') {
            return 'S';
        }
        if (mostProbableEnemyMove === 'S') {
            return 'R';
        }
        if (mostProbableEnemyMove === 'W') { //choose randomly from rock, paper and scissors
            var randIndex = Math.floor(Math.random() * 3);
            return possibleMoves[randIndex];
        }
        if (mostProbableEnemyMove==='D') {
            if (this.enemyHasDynamite===true) {
                return 'W';
            } else {
                if (this.dynamiteCount<100) {
                    return 'D'; //play dynamite if enemy has no dynamite and the player still has dynamite
                } else { //if both players are out of dynamite choose randomly from rock, paper and scissors
                    var randIndex = Math.floor(Math.random() * 3);
                    return possibleMoves[randIndex];
                }
            }
        }
        throw ('Error: mostProbableEnemyMove = ' + mostProbableEnemyMove);
    }
}

module.exports = new Bot();
