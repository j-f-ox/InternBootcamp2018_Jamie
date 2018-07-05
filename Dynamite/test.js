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

