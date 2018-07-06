//play random moves except water, with ways of dealing with draws
class Bot {
    constructor() {
        this.dynamiteCount = 0;
        this.drawCount = 0;
        this.doesEnemyWaterAfterDraws = false;
    }

    updateDrawCount(round) { //count the number of draws in a row
        if (this.drawCount === 1 && round.p2==='W') {
            this.doesEnemyWaterAfterDraws = true;
        }
        if (round.p1 === round.p2) { //if the previous round was a draw
            this.drawCount += 1;
        } else {
            this.drawCount = 0;
        }
    }
    
    makeRandomNoWaterMove() { //return a random move that isn't water
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

    makeMove(gamestate) {
        if (gamestate.rounds.length <1) {
            this.dynamiteCount += 1;
            return 'D';
        }
        let prevRound = gamestate.rounds.slice(-1)[0];
        this.updateDrawCount(prevRound);
        if (0<this.drawCount && this.dynamiteCount<100) { //if the previous round was a draw
            if (this.doesEnemyWaterAfterDraws) { //if enemy plays water on draws
                return 'R';
            }

            if (this.drawCount>=2) { //if there have been over 3 draws play water
                if (Math.random()<0.2 && this.dynamiteCount<100) {
                    this.dynamiteCount+=1;
                    return 'D';
                }
                return 'W';
            }
            this.dynamiteCount += 1; //if there have been [1,3] draws play dynamite
            return 'D';
        }

        return this.makeRandomNoWaterMove();

        
    }
}

module.exports = new Bot();

