/*for (i=1; i<101; i++) {
    if (i%5==0 && i%3==0) { //if i is a multiple of 3 and 5
        console.log('FizzBuzz');
    } else if (i%3==0) { //if i is a mult of 3
        console.log('Fizz');
    } else if (i%5==0) { //if i is a mult of 5
        console.log('Buzz'); 
    } else { //for all other i
        console.log(i);
    }
}


for (i=1; i<106; i++) {
    if (i%3==0) {
        if (i%5==0) {
            if (i%7==0) {
                console.log('FizzBuzzBang'); //mult of 3 5 7
            }
            else {
                console.log('FizzBuzz'); //mult of 3 and 5
            }
        }
        else if (i%7==0) {
            console.log('FizzBang'); //mult of 3 and 7
        }
        else{
                console.log('Fizz'); //mult of 3
        }
    } else if (i%5==0) {
        if (i%7==0) {
            console.log('BuzzBang'); //mult of 5 and 7
        } else {
            console.log('Buzz'); //mult of 5
        }
    } else if (i%5==0) {
        console.log('Bang'); //mult of 7
    } else {
        console.log(i); //all other i
    }
}*/

//part 2i
/*for (i=1; i<106; i++) {
    out = [];
    if (i%3===0) {
        out.push('Fizz');
    }
    if (i%5===0) {
        out.push('Buzz')
    }
    if (i%7===0) {
        out.push('Bang');
    }
    if (out.length === 0) {
        console.log(i);
    } else {
    console.log(out.join(''));
    }
}*/

//part 2ii
/*for (i=1; i<106; i++) {
    if (i%11===0) {
        console.log('Bong')
    } else {
        out = [];
        if (i%3===0) {
            out.push('Fizz');
        }
        if (i%5===0) {
            out.push('Buzz')
        }
        if (i%7===0) {
            out.push('Bang');
        }
        if (out.length === 0) {
            console.log(i);
        } else {
        console.log(out.join(''));
        }
    }
}*/


//part 2iii
/*for (i=1; i<230; i++) {
    out = []; //an array containing the words below for each factor of i
    if (i%11===0) {
        out.push('Bong')
    } else {
        out = [];
        if (i%3===0) {
            out.push('Fizz');
        }
        if (i%5===0) {
            out.push('Buzz')
        }
        if (i%7===0) {
            out.push('Bang');
        }
    } 
    if (i%13==0) {
        if (out.length===0) {
            console.log('Fezz'); //ie if i mult of 13 only
        } else { //if a mult of 13 and other relevant factors
            if (out[0][0]==='F') { //ie if i is a multiple of 3 and Fizz in out
                out.splice(1,0,'Fezz'); //insert Fezz after Fizz
                console.log(out.join(''));
            } else {
                console.log('Fezz'+out.join(''));
            }
        }
    } else if (out.length===0) { //if i is not a multiple of 13 do as in part ii
        console.log(i);
    } else {
        console.log(out.join(''));
    }
}*/

//part 2iv
for (i=1; i<=210; i++) {
    out = []; //an array containing the words below for each factor of i
    if (i%11===0) {
        out.push('Bong')
    } else {
        out = [];
        if (i%3===0) {
            out.push('Fizz');
        }
        if (i%5===0) {
            out.push('Buzz')
        }
        if (i%7===0) {
            out.push('Bang');
        }
    } 
    if (i%13==0) {
        if (out.length===0) {
            console.log('Fezz'); //ie if i mult of 13 only
        } else { //if a mult of 13 and other relevant factors
            if (out[0][0]==='F') { //ie if i is a multiple of 3 and Fizz in out
                out.splice(1,0,'Fezz'); //insert Fezz after Fizz
                console.log(out.reverse().join(''));
            } else {
                console.log(out.reverse().join('') + 'Fezz');
            }
        }
    } else if (out.length===0) { //if i is not a multiple of 13 do as in part ii
        console.log(i);
    } else {
        console.log(out.reverse().join(''));
    }
}