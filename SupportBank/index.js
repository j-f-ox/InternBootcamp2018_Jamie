var fs = require('fs');
var Papa = require('papaparse');
var file = './Transactions2014.csv';
var content = fs.readFileSync(file, "utf8");

Papa.parse(content, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {
        //console.log("Finished:", results.data);
        transactions = results.data.slice(1,8); //remove global if possible
    }
});


var accounts = {};
for (i=0; i<transactions.length; i++) {
    payFrom = transactions[i][1];
    payTo = transactions[i][2];
    payAmount = parseFloat(transactions[i][4]);
    if (typeof accounts[payFrom] !== 'undefined') { //if the person has an account already
        accounts[payFrom] = accounts[payFrom] - payAmount;
    } else {
        accounts[payFrom] = -payAmount;
    }
    if (typeof accounts[payTo] !== 'undefined') { //if the person has an account already
        accounts[payTo] = accounts[payTo] + payAmount;
    } else {
        accounts[payTo] = payAmount;
    }
}

console.log(accounts)