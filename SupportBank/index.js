//set-up-modules////////////////////////////////////////////
var fs = require('fs');
var Papa = require('papaparse');
var moment = require('moment');
var readlineSync = require('readline-sync');
var accountFun = require('./accountFunc.js');
//import * as accountFunc from '/accountFunc.js';
//import {updateAccount} from './accountFunc.js';
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
var transactions2014text = fs.readFileSync(trans14, "utf8");
var trans15 = './DodgyTransactions2015.csv';
var transactions2015text = fs.readFileSync(trans15, "utf8");

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
Papa.parse(transactions2015text, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {
        let tranArray = results.data.slice(1, results.data.length-1); //an array of 5-element arrays of transactions. The slice is to remove the header and the newline at the end.
        let accounts = {}; //a dictionary of a name and the corresponding account
        /*function updateAccount(someRow, sign) {
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
                if (isNaN(someAmount) && sign===1) { //check that the current balance is a number. The sign condition is to prevent duplicate messages for from/to.
                    logger.info('ERROR - given amount is not a number. The value of column 5, row ', i, ' is ', someAmount);
                }
                somePayment = new payment( moment(someRow[0],"DD-MM-YYYY"),someRow[1],someRow[2],someRow[3],parseFloat(someAmount) );
                accounts[somePerson].payments.push(somePayment); //add the current payment to the list of somePerson's transactions
                accounts[somePerson].balance =  accounts[somePerson].balance + sign*someAmount; //update somePerson's account balance
            }    
        }*/
        
        for (i=0; i<tranArray.length; i++) {
            currentRow = tranArray[i]; //the row of transaction data we are working with
            foo = new account('tOM', [4], 5);
            foo.updateAccount(currentRow, 1, accounts);
            //accountFun.updateAccount(currentRow, 1, accounts); //update the 'to' account
            //accountFun.updateAccount(currentRow, -1, accounts);//update the 'from' account
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
                    console.log(currentAccount.name+' owes '+(-currentBalance).toFixed(2).toString()); //'-' sign to remove the negative sign of balance in this case
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
        } else { //if the input does not begin 'List *'
            console.log('Invalid input')
        }
    }
});



/*
//let userInput = readlineSync.question('What accounts would you like to see? Type List [name] or List All.\n');
Papa.parse(transactions2015, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {

    }
});
*/