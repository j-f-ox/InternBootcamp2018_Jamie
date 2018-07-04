//copy player 2's last move at each turn
class Bot {
    makeMove(gamestate) {
        if (gamestate.rounds.length < 1) {
            return 'R' //play rock on the first turn
        }
        let lastMoves = gamestate.rounds[gamestate.rounds.length-1];
        return lastMoves.p2;
    }
}

module.exports = new Bot();
