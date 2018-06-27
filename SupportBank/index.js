var fs = require('fs');
var Papa = require('papaparse');
var moment = require('moment');
moment().format();
var readlineSync = require('readline-sync');
var file = './Transactions2014.csv';
var content = fs.readFileSync(file, "utf8");

Papa.parse(content, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {
        //console.log("Finished:", results.data);
        tArray = results.data.slice(1,); //an array of 5 element arrays - remove global if possible
    }
});

class payment {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }
}

transactions = [];
for (i=0; i<tArray.length; i++) { //transactions is an array of objects
    transactions.push( new payment( moment(tArray[i][0],"DD-MM-YYYY"), tArray[i][1], tArray[i][2], tArray[i][3], parseFloat(tArray[i][4]) ) );
}

console.log(transactions[0].date)


/*

//this is wrong: paying each other not softwire! (ish...)
var accounts = {};
for (i=0; i<transactions.length-1; i++) {
    payFrom = transactions[i][1];
    payTo = transactions[i][2];
    payAmount = parseInt(100*transactions[i][4]); //multiply by 100 and treat as integers to avoid floating point error
    nameCode = [payFrom, payTo].sort(); //concatenate the two names in alphabetical order, assuming no duplicate names
    if (payFrom < payTo) { //1 if payFrom is alphabetically before payTo, -1 otherwise
        sign = 1;
    } else {
        sign = -1;
    }
    if (typeof accounts[nameCode] !== 'undefined') { //if the pair have an account already
        accounts[nameCode] = accounts[nameCode] + sign*payAmount;
    } else {
        accounts[nameCode] = sign*payAmount;
    }
}
for (let name in accounts) {
    accounts[name] = accounts[name]/100; //scale the amount owed back down
    //console.log(name + (accounts[name]).toString())
}
//console.log(accounts)















var nameToList = readlineSync.question('What accounts would you like to see? Type List [name] or List All.');
if (nameToList==='All') {
    console.log('hi');
} else if (typeof accounts[nameToList] !== 'undefined') {
    if (accounts[nameToList] > 0) { //if the person is in credit
        console.log(nameToList + ' is owed £' + accounts[nameToList].toString());
    } else { //if the person owes money
        console.log(nameToList + ' owes £' + accounts[nameToList].toString());
    }
} else {
    console.log('Invalid input.')
}*/