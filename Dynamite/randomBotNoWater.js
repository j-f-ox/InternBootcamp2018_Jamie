//play random moves except water
class Bot {
    constructor() {
        this.dynamiteCount = 0;
    }

    makeMove(gamestate) {
        let possibleMoves = ['R','P','S','D'];
        if (this.dynamiteCount===100) {
            var randIndex = Math.floor(Math.random() * 3);
        } else {
            var randIndex = Math.floor(Math.random() * 4);
            if (randIndex===3) {
                this.dynamiteCount += 1;
            }
        }
        return possibleMoves[randIndex];
    }
}

module.exports = new Bot();

