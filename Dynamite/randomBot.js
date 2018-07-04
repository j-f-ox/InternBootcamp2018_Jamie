//play random moves
class Bot {
    constructor() {
        this.dynamiteCount = 0;
    }

    makeMove(gamestate) {
        let possibleMoves = ['R','P','S','W','D'];
        if (this.dynamiteCount===100) {
            var randIndex = Math.floor(Math.random() * 4);
        } else {
            var randIndex = Math.floor(Math.random() * 5);
            if (randIndex===4) {
                this.dynamiteCount += 1;
            }
        }
        return possibleMoves[randIndex];
    }
}

module.exports = new Bot();
