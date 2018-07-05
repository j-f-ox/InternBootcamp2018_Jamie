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

gamestate = {'rounds': [{'p1': 'R','p2': 'S'}, {'p1': 'R','p2': 'P'}, {'p1': 'R','p2': 'R'}, {'p1': 'R','p2': 'S'}, {'p1': 'R','p2': 'P'}]};
patternFinder(gamestate, 2);
console.log(patternFinder(gamestate, 2));