//analyse previous rounds looking for patterns of moves to predict the future
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
        if (move==='D' && moveCount===100) {
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

    getArrayOfP2Moves(gamestate) { 
        //returns an array of the moves P2 has played so far
        let p2Moves = []
        let roundsSoFar = gamestate.rounds;
        for (let i=0; i<roundsSoFar.length; i++) {
            p2Moves.push(roundsSoFar[i].p2);
        }
        return p2Moves;
    }

    getAllIndicesOf(element, array) { 
        //returns an array containing the index of every occuence of element in array
        let indicesArray = []
        let currentInd = 0;
        while (currentInd<array.length) {
            let newInd = array.indexOf(element, currentInd);
            if (newInd > -1) {
                indicesArray.push(newInd);
                currentInd = newInd+1;
            } else {
                break;
            }
        }
        return indicesArray;
    }
    
    findArrayIntersection(arr1, arr2) { 
        //return the elements common to both arrays (or an empty array if there are none)
        arr1 = arr1.filter( (currentValue) => arr2.indexOf(currentValue) > -1 ) //get the values of arr2 that are also in arr1
            .filter( ( item, index, inputArray ) => inputArray.indexOf(item) == index ); //remove duplicate values
        return arr1;
    }
    
    findSubArrayIndices(subArray, array) { 
        //if subArray is contained in array, return the indices in array at which subArray starts otherwise return []
        let subArrayIndicesInArray = getAllIndicesOf(subArray[0], array);
        for (let i=0; i<subArray.length; i++) {
            let currentItem = subArray[i];
            let currentItemIndicesInArray = getAllIndicesOf(currentItem, array);
            currentItemIndicesInArray.forEach( (element, index) => {currentItemIndicesInArray[index] = element-i} );
            subArrayIndicesInArray = findArrayIntersection(subArrayIndicesInArray, currentItemIndicesInArray); //get the intersection of the two arrays
        }
        return subArrayIndicesInArray;
    }

    patternFinder(gamestate) {
        
    }
    

    makeMove(gamestate) {
        if (gamestate.rounds.length < 1) {
            return 'R' //play rock on the first turn
        }
        let possibleMoves = ['R','P','S','W','D'];
        let enemyMoveProbs = this.getEnemyMoveProbabilities(gamestate);
        let mostProbableEnemyMove = Object.keys(enemyMoveProbs).reduce( function(prevVal, newVal){ return enemyMoveProbs[prevVal] > enemyMoveProbs[newVal] ? prevVal : newVal });
        
    }
}

module.exports = new Bot();
