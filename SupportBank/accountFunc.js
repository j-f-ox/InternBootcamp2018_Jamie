class account {
    constructor(name, payments, balance) {
        this.name = name;
        this.payments = payments;
        this.balance = balance;
    }
}
function updateAccount(someRow, sign, accounts) {
//function to update the dictionary of accounts with data from the given row of data "someRow"
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
            logger.info('ERROR - the amount in the given row is not a number. The value of this row is ', someRow);
        }
        somePayment = new payment( moment(someRow[0],"DD-MM-YYYY"),someRow[1],someRow[2],someRow[3],parseFloat(someAmount) );
        accounts[somePerson].payments.push(somePayment); //add the current payment to the list of somePerson's transactions
        accounts[somePerson].balance =  accounts[somePerson].balance + sign*someAmount; //update somePerson's account balance
    }    
}

module.exports(account);
module.exports(updateAccount);