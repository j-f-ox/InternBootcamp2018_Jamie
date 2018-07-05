//note: this assumes that you are player 1
//play water until player 2 runs out of dynamite. Then play dynamite until you run out of dynamite. Then play rock.
class Bot {
    constructor() {
        this.dynamiteCount = 0;
        this.enemyDynamiteCount = 0;
        this.enemyHasNoDynamite = false;
    }

    makeMove(gamestate) {
        if (gamestate.rounds.length < 1) {
            return 'W'; //play water on the first turn
        }
        let lastMoves = gamestate.rounds[gamestate.rounds.length-1];
        if (lastMoves.p2==='D') { //update the amount of dynamites the enemy has used
            this.enemyDynamiteCount += 1;
            if (this.enemyDynamiteCount===100) { //if player 2 has run out of dynamite
                this.enemyHasNoDynamite = true;
            }
        }
        if (!this.enemyHasNoDynamite) {
            return 'W';  
        } else {
            while (this.dynamiteCount<100) {  
                this.dynamiteCount += 1;              
                return 'D';
            } 
            return 'R';
        }
    }
}

module.exports = new Bot();
