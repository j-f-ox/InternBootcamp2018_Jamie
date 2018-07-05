//this bot plays RPSW on a loop
class Bot {

    makeMove(gamestate) {
        let possibleMoves = ['R','P','S','W','D'];
        let roundNumber = gamestate.rounds.length;
        return possibleMoves[roundNumber%4];
    }
}

module.exports = new Bot();
