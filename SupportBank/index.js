var fs = require('fs');
var Papa = require('papaparse');
var file = './Transactions2014.csv';
var content = fs.readFileSync(file, "utf8");

Papa.parse(content, { //parse into a "matrix" array where each element is an array of the rows 
    complete: function(results) {
        console.log("Finished:", results.data);
    }
});

var accounts = {};
for (i=0; i<results.data.length; i++) {

}.