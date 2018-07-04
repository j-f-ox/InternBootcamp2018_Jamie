class Bot {
    constructor(dynamiteCount) {
        this.dynamiteCount = dynamiteCount;
    }

    makeMove(gamestate) {
        let possibleMoves = ['R','P','S','W','D'];
        if (this.dynamiteCount===100) {
            var randIndex = Math.floor(Math.random() * 4);
        } else {
            var randIndex = Math.floor(Math.random() * 5);
            if (randIndex===4) {
                let dynamiteNum = this.dynamiteCount;
                this.dynamiteCount = (typeof(dynamiteNum)==='undefined') ? 1 : dynamiteNum+1;
            }
        }
        return possibleMoves[randIndex];
    }
}

module.exports = new Bot();
