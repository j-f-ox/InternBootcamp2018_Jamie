//analyse previous rounds looking for patterns of moves to predict the future
class Bot {
    constructor() {
        this.dynamiteCount = 0;
        this.enemyHasDynamite = true;
        //this.playerHasDynamite = true; //goes to false when the bot runs out of dynamite
    }

    getAmountOfMoves(gamestate, move) {
        //return the number of times p2 has played the given move
        if (!['R', 'P', 'S', 'W', 'D'].includes(move)) { //if "move" is not a valid move
            throw ('Error: invalid move passed to getAmountOfMoves. ' + move + ' is not a recognised move.')
        }
        let roundsSoFar = gamestate.rounds;
        let moveCount = 0;
        for (let i = 0; i < roundsSoFar.length; i++) {
            if (roundsSoFar[i].p2 === move) {
                moveCount += 1;
            }
        }
        if (move === 'D' && moveCount === 100) {
            this.enemyHasDynamite = false;
        }
        return moveCount;
    }

    getEnemyMoveProbabilities(gamestate) {
        //return the probabilities of p2 playing each move up until now in the game in the order of possibleMoves
        let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
        let moveProbabilities = {};
        let totalNumberOfMoves = gamestate.rounds.length;
        for (let i = 0; i < 5; i++) {
            let currentMove = possibleMoves[i];
            let numberOfCurrentMove = this.getAmountOfMoves(gamestate, currentMove);
            moveProbabilities[currentMove] = numberOfCurrentMove / totalNumberOfMoves; //divide number of moves by total moves to get probabilities
        }
        return moveProbabilities;
    }

    getArrayOfP2Moves(gamestate) {
        //returns an array of the moves P2 has played so far
        let p2Moves = []
        let roundsSoFar = gamestate.rounds;
        for (let i = 0; i < roundsSoFar.length; i++) {
            p2Moves.push(roundsSoFar[i].p2);
        }
        return p2Moves;
    }

    getAllIndicesOf(element, array) {
        //returns an array containing the index of every occuence of element in array
        let indicesArray = []
        let currentInd = 0;
        while (currentInd < array.length) {
            let newInd = array.indexOf(element, currentInd);
            if (newInd > -1) {
                indicesArray.push(newInd);
                currentInd = newInd + 1;
            } else {
                break;
            }
        }
        return indicesArray;
    }

    findArrayIntersection(arr1, arr2) {
        //return the elements common to both arrays (or an empty array if there are none)
        arr1 = arr1.filter((currentValue) => arr2.indexOf(currentValue) > -1) //get the values of arr2 that are also in arr1
            .filter((item, index, inputArray) => inputArray.indexOf(item) == index); //remove duplicate values
        return arr1;
    }

    findSubArrayIndices(subArray, array) {
        //if subArray is contained in array, return the indices in array at which subArray starts otherwise return []
        let subArrayIndicesInArray = this.getAllIndicesOf(subArray[0], array);
        for (let i = 0; i < subArray.length; i++) {
            let currentItem = subArray[i];
            let currentItemIndicesInArray = this.getAllIndicesOf(currentItem, array);
            currentItemIndicesInArray.forEach((element, index) => { currentItemIndicesInArray[index] = element - i });
            subArrayIndicesInArray = this.findArrayIntersection(subArrayIndicesInArray, currentItemIndicesInArray); //get the intersection of the two arrays
        }
        return subArrayIndicesInArray;
    }

    getMode(array) {
        //return most common element in an array. If 2 elemnts are equally common it returns the first one in the array.
        if (array.length === 0) {
            throw ("Error: can't find mode of an empty array");
        }
        let modeArray = {};
        let currentMode = array[0];
        let maxCount = 1;
        for (let i = 0; i < array.length; i++) {
            let curentElement = array[i];
            if (typeof(modeArray[curentElement]) === 'undefined') {
                modeArray[curentElement] = 1;
            } else {
                modeArray[curentElement] += 1;
            }
            if (modeArray[curentElement] > maxCount) {
                currentMode = curentElement;
                maxCount = modeArray[curentElement];
            }
        }
        return currentMode;
    }

    patternFinder(gamestate, patternLength) {
        //return false if the most recent "patternLength" moves have never occured in this sequence. Otherwise return the move that follows this pattern the most frequently.
        let enemyMoves = this.getArrayOfP2Moves(gamestate);
        if (patternLength > enemyMoves.length) {
            throw ('Error: patternlength is larger than the number of moves so far');
        }
        let currentPattern = enemyMoves.slice(-patternLength);
        let previousPattternOccurrences = this.findSubArrayIndices(currentPattern, enemyMoves.slice(0, enemyMoves.length - 1)); //slice enemyMoves as we don't the most recent occurence of pattern
        if (previousPattternOccurrences.length === 0) { //if the pattern has never occurred
            return false;
        } else {
            let nextElements = []; //array of elements that have followed currentPattern in the past
            for (let i = 0; i < previousPattternOccurrences.length; i++) {
                let currentPatternIndex = previousPattternOccurrences[i];
                nextElements.push(enemyMoves[currentPatternIndex + patternLength]);
            }
            let probableMove = this.getMode(nextElements);
            return probableMove;
        }
    }

    moveDecider(probableEnemyMove) {
        //tell the bot what to do depending on what the enemy will probably do
        let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
        if (probableEnemyMove === 'R') {
            return 'P';
        }
        if (probableEnemyMove === 'P') {
            return 'S';
        }
        if (probableEnemyMove === 'S') {
            return 'R';
        }
        if (probableEnemyMove === 'W') { //choose randomly from rock, paper and scissors
            let randIndex = Math.floor(Math.random() * 3);
            return possibleMoves[randIndex];
        }
        if (probableEnemyMove==='D') {
            if (this.enemyHasDynamite===true) {
                return 'W';
            } else {
                if (this.dynamiteCount<100) {
                    return 'D'; //play dynamite if enemy has no dynamite and the player still has dynamite
                } else { //if both players are out of dynamite choose randomly from rock, paper and scissors
                    let randIndex = Math.floor(Math.random() * 3);
                    return possibleMoves[randIndex];
                }
            }
        }
    }


    makeMove(gamestate) {
        let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
        if (gamestate.rounds.length < 10) { //play randomly on the first 10 turns
            let randIndex = Math.floor(Math.random() * 5);
            return possibleMoves[randIndex]; 
        }
        let probableEnemyMove = this.patternFinder(gamestate, 4) || 'R'; //if the pattern has never occurred assume the player will play rock

        return this.moveDecider(probableEnemyMove);
    }
}

module.exports = new Bot();
