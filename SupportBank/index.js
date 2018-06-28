//set-up-modules////////////////////////////////////////////
var fs = require('fs');
var Papa = require('papaparse');
var moment = require('moment');
var readlineSync = require('readline-sync');
var log4js = require('log4js');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});
const logger = log4js.getLogger();
logger.debug("Some debug messages");
//logger.info('cheese value:', 9)

//import-files///////////////////////////////////////////////
var trans14 = './Transactions2014.csv';
var transactions2014 = fs.readFileSync(trans14, "utf8");
var trans15 = './DodgyTransactions2015.csv';
var transactions2015 = fs.readFileSync(trans15, "utf8");

//classes////////////////////////////////////////////////////
class payment {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }
}
class account {
    constructor(name, payments, balance) {
        this.name = name;
        this.payments = payments;
        this.balance = balance;
    }
}



//body/////////////////////////////////////////////////////////
let userInput = readlineSync.question('What accounts would you like to see? Type List [name] or List All.\n');
Papa.parse(transactions2014, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {
        let tranArray = results.data.slice(1, results.data.length-1); //an array of 5-element arrays of transactions. The slice is to remove the header and the newline at the end.
        let accounts = {}; //a dictionary of a name and the corresponding account
        function updateAccount(someRow, sign) {
            //direction is -1 for payment 'from' and 1 for 'to'
            if (sign===1) {
                var somePerson = someRow[2];
            } else {
                var somePerson = someRow[1];
            }
            if (!accounts[somePerson]) { //if somePerson doesn't have an account yet, create a blank one and rerun the function
                accounts[somePerson] = new account(somePerson, [], 0);
                updateAccount(someRow, sign);
            } else {
                someAmount = someRow[4];
                if (isNaN(someAmount)) { //check that the current balance is a number
                    logger.info('Amount is not a number. The value of column 5, row ');
                }
                somePayment = new payment( moment(someRow[0],"DD-MM-YYYY"),someRow[1],someRow[2],someRow[3],parseFloat(someAmount) );
                accounts[somePerson].payments.push(somePayment); //add the current payment to the list of somePerson's transactions
                accounts[somePerson].balance =  accounts[somePerson].balance + sign*someAmount; //update somePerson's account balance
            }    
        }
        
        for (i=0; i<tranArray.length; i++) {
            currentRow = tranArray[i]; //the row of transaction data we are working with
            updateAccount(currentRow, 1); //update the 'to' account
            updateAccount(currentRow, -1);//update the 'from' account
        }
        for (var key in accounts) { 
            accounts[key].balance = Math.round(accounts[key].balance * 100) / 100; //fix small floating point error
        }

        
        if (userInput==='List All') {
            for (var key in accounts) { 
                currentAccount = accounts[key];
                currentBalance = currentAccount.balance;
                if (currentBalance > 0) { //if the current person is in credit
                    console.log(currentAccount.name+' is owed '+currentBalance.toFixed(2).toString());
                } else {
                    console.log(currentAccount.name+' owes '+(-currentBalance).toFixed(2).toString()); //- sign to remove the negative sign of balance
                }
            }
        } else if (userInput.slice(0,5)==='List ' && userInput.length>5) { //check for user input beginning 'List ' followed by something
            let name = userInput.slice(5); //get just the name from the user input
            if (accounts[name] === undefined) {
                console.log('There are no transactions corresponding to that name')
            } else { //ie if there are some transactions corresponding to 'name'
                let nameTransactions = accounts[name].payments;
                for (i=0; i<nameTransactions.length; i++) {
                    let current = nameTransactions[i];
                    console.log(current.from+' paid '+current.to+' £'+current.amount.toFixed(2).toString()+' on '+moment(current.date).format('DD MMM YYYY')+' for '+current.narrative)
                } 
                console.log(name+'\'s account balance is £'+accounts[name].balance.toFixed(2).toString())
            }
        } else {
            console.log('Invalid input')
        }
    }
});




//let userInput = readlineSync.question('What accounts would you like to see? Type List [name] or List All.\n');
Papa.parse(transactions2015, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {

    }
});




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
//console.log(accounts)*/