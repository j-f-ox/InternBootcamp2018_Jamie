function getAllIndicesOf(element, array) { 
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

function findArrayIntersection(arr1, arr2) { 
    //return the elements common to both arrays (or an empty array if there are none)
    arr1 = arr1.filter( (currentValue) => arr2.indexOf(currentValue) > -1 ) //get the values of arr2 that are also in arr1
        .filter( ( item, index, inputArray ) => inputArray.indexOf(item) == index ); //remove duplicate values
    return arr1;
}

function findSubArrayIndices (subArray, array) { 
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

function getMode(array) {
    //return most common element in an array. If 2 elemnts are equally common it returns the first one in the array.
    if (array.length === 0) {
        throw ("Error: can't find mode of an empty array");
    }
    var modeArray = {};
    var currentMode = array[0];
    maxCount = 1;
    for (let i = 0; i < array.length; i++) {
        var curentElement = array[i];
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

a = [1,3,547,65,8,4,3,2,2,2]
b = [1,2,3,5]
c = [4,6,6,8]
d = [4,6,6,8,8]

/*console.log(getMode(a))
console.log(getMode(b))
console.log(getMode(c))
console.log(getMode(d))*/

function patternFinder(gamestate, patternLength) {
    //return false if the most recent "patternLength" moves have never occured in this sequence. Otherwise return the move that follows this pattern the most frequently.
    let enemyMoves = getArrayOfP2Moves(gamestate);
    if (patternLength > enemyMoves.length) {
        throw ('Error: patternlength is larger than the number of moves so far');
    }
    let currentPattern = enemyMoves.slice(-patternLength);
    let previousPattternOccurrences = findSubArrayIndices(currentPattern, enemyMoves.slice(0, enemyMoves.length - 1)); //slice enemyMoves as we don't the most recent occurence of pattern
    if (previousPattternOccurrences.length === 0) { //if the pattern has never occurred
        console.log('fail')
        return false;
    } else {
        let nextElements = []; //array of elements that have followed currentPattern in the past
        for (let i = 0; i < previousPattternOccurrences.length; i++) {
            let currentPatternIndex = previousPattternOccurrences[i];
            nextElements.push(enemyMoves[currentPatternIndex + patternLength]);
        }
        let probableMove = getMode(nextElements);
        return probableMove;
    }
}

function getArrayOfP2Moves(gamestate) {
    //returns an array of the moves P2 has played so far
    let p2Moves = []
    let roundsSoFar = gamestate.rounds;
    for (let i = 0; i < roundsSoFar.length; i++) {
        p2Moves.push(roundsSoFar[i].p2);
    }
    return p2Moves;
}

function didILose(round) { //returns whether p1 lost the previous round
    //return false if I won, true if I lost
    let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
    let p1Move = round.p1;
    let p2Move = round.p2;
    if (p1Move === p2Move) {
        return 0;
    }
    if (p1Move === 'D') {
        if (p2Move === 'W') {
            return true;
        }
        return false;
    }
    if (p1Move === 'W') {
        if (p2Move === 'D') {
            return false;
        }
        return true;
    }

    if (p2Move === 'D') { //otherwise p1 played rock, paper or scissors
        return true;
    }
    if (p2Move === 'W') { 
        return false;
    }
    let p1Ind = possibleMoves.indexOf(p1Move); 
    let p2Ind = possibleMoves.indexOf(p2Move);
    if (p1Ind!==0 && p2Ind!==0) { //if paper and scissors were played
        return (p1Move === 'P') ? true : false; //if paper and scissors were played
    } else { //if rock and either paper or scissors were played
        if (p1Move === 'R') {
            return (p2Move === 'P') ? true : false;
        }
        if (p2Move === 'R') {
            return (p1Move === 'P') ? false : true;
        }
    }

}
function recentLossPercentage(gamestate, end,  start=1) {
    //return what fraction of rounds I lost (NB: not drew as 0 is falsy) between rounds start and end
    let relevantRounds = gamestate.rounds.slice(start-1, end); //start -1 as indexing starts from 0
    let lossCount = 0;
    for (let i=0; i<relevantRounds.length; i++) {
        if (didILose(relevantRounds[i])) { //if p1 lost this round
            lossCount+=1;
        }
    }
    return lossCount/(end-start+1)
}
function doesPlayer2KnowMyStrategy(gamestate) {
    let numberOfRounds = gamestate.rounds.length;
    let initialLosses = this.recentLossPercentage(gamestate, 50,  1);
    let recentLosses = this.recentLossPercentage(gamestate, numberOfRounds,  numberOfRounds-49);
    if (initialLosses/recentLosses<0.98) { //if the other bot is doing better recently than at the start
        console.log('they know');
        return true;
    } 
    return false;
}


//gamestate = {'rounds': [{'p1': 'R','p2': 'S'}, {'p1': 'R','p2': 'P'}, {'p1': 'R','p2': 'R'}, {'p1': 'R','p2': 'S'}, {'p1': 'R','p2': 'P'}]};
/*
console.log('50s')
for (var i=0; i<20; i++) {
    console.log('i='+i+' '+recentLossPercentage(gamestate, i*50+50,  i*50+1));
}

console.log('100s')
for (var i=0; i<10; i++) {
    console.log('i='+i+' '+recentLossPercentage(gamestate, i*100+100,  i*100+1));
}

console.log('200s')
for (var i=0; i<10; i++) {
    console.log('i='+i+' '+recentLossPercentage(gamestate, i*200+200,  i*200+1));
}*/
function updateDrawCount(round) { //count the number of draws in a row
    if (drawCount === 1 && round.p2==='W') {
        doesEnemyWaterAfterDraws = true;
    }
    if (round.p1 === round.p2) { //if the previous round was a draw
        drawCount += 1;
    } else {
        drawCount = 0;
    }   
}
gamestate = {"rounds":[{"p1":"P","p2":"S"},{"p1":"P","p2":"R"},{"p1":"R","p2":"R"},{"p1":"D","p2":"D"},{"p1":"R","p2":"W"},{"p1":"R","p2":"R"},{"p1":"D","p2":"D"},{"p1":"S","p2":"W"},{"p1":"D","p2":"P"},{"p1":"S","p2":"R"},{"p1":"W","p2":"R"},{"p1":"W","p2":"P"},{"p1":"P","p2":"R"},{"p1":"P","p2":"P"},{"p1":"D","p2":"D"},{"p1":"W","p2":"W"},{"p1":"W","p2":"P"},{"p1":"P","p2":"P"},{"p1":"D","p2":"R"},{"p1":"P","p2":"P"},{"p1":"D","p2":"W"}/*,{"p1":"S","p2":"R"}*/]}
/*
doesEnemyWaterAfterDraws = false;
drawCount = 0;
previousRound = gamestate.rounds[gamestate.rounds.length-2];
console.log(previousRound)
updateDrawCount(previousRound)
console.log(doesEnemyWaterAfterDraws)
console.log(drawCount)

previousRound = gamestate.rounds[gamestate.rounds.length-1];
console.log(previousRound)
updateDrawCount(previousRound)
console.log(doesEnemyWaterAfterDraws)
console.log(drawCount)*/
function makeRandomMove(numberOfMoves = 5, withWater = true) {
    //make a pseudorandom move out of the first "numberOfMoves" elements of possibleMoves
    //if withWater = false then make a random non-water move
    let possibleMoves = ['R', 'P', 'S', 'W', 'D'];
    if (withWater === false) {
        possibleMoves = ['R', 'P', 'S', 'D'];
        if (numberOfMoves === 5) {
            numberOfMoves = 4;
        }
    }
    let randIndex = Math.floor(Math.random() * numberOfMoves);
    let outputMove = possibleMoves[randIndex];
    if (outputMove === 'D') {
        if (dynamiteCount>=100) {
            return makeRandomMove(3);
        }
    }
    return outputMove; 
}
dynamiteCount = 3;
console.log(makeRandomMove(5, false))
console.log(makeRandomMove(5, false))
console.log(makeRandomMove(5, false))
console.log(makeRandomMove(5, false))
console.log(makeRandomMove(5, false))
console.log(makeRandomMove(5, false))
console.log(makeRandomMove(5, false))