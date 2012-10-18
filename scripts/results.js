/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 30.09.12
 * Time: 00:40
 * To change this template use File | Settings | File Templates.
 */

function Game(homeTeamName, awayTeamName, league, round) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.league = league;
    this.round = round;
}


Game.BASE_TEST = 130000;
Game.TICK_MAX = 91;
Game.TICK_AFTER = 30;

Game.HOUSE_ADV = 85;
Game.GOAL_DIM = 25;
Game.ELO_ATT = 2;
Game.ELO_DIFF = 1.3;


 Game.prototype.addResultToTicker = function () {
     var minute = this.round.minutes;
     this.round.updatedStrings.push(minute +"' : "+this.toString());
     //var sevenStrings = this.round.updatedStrings.slice(Math.max(this.round.updatedStrings.length - 7, 0))
     var ticker = this.round.updatedStrings.join("\r\n");
     var lastResultIdElement = document.getElementById("lastResultId")
     lastResultIdElement.value= ticker;
     lastResultIdElement.scrollTop = lastResultIdElement.scrollHeight;
}

Game.prototype.toString = function() {
    return this.homeTeamName+"-"+this.awayTeamName+ " "+this.homeGoals+"-"+this.awayGoals;
}

Game.prototype.initElos = function() {
    this.homeGoals = 0;
    this.awayGoals = 0;

    this.homeTeamElo = this.league.getTeamElo(this.homeTeamName);
    this.awayTeamElo = this.league.getTeamElo(this.awayTeamName);

    if (this.homeTeamElo < 1000) {
        console.log("NO ELO FOUND FOR"+this.homeTeamName);
    }

    if (this.awayTeamElo < 1000) {
        console.log("NO ELO FOUND FOR"+this.awayTeamName);
    }

    this.minutes = 0;
}

Game.prototype.doPlay = function() {
    for (var tickCount = 0; tickCount < Game.TICK_MAX; tickCount++ ) {
        this.doTick();
    }
}


Game.prototype.finalizeResult = function(elRoundCols , roundIndex) {
    championShip.addResult(this.homeTeamName,this.awayTeamName, this.homeGoals, this.awayGoals );
    this.enterResult(elRoundCols , roundIndex)
}

Game.prototype.getCurrentCols = function(roundIndex ) {
    var currentRoundTable = document.getElementById("currentRound");
    var currentRows = currentRoundTable.getElementsByTagName("tr");
    var currentRow = currentRows[roundIndex];
    var currentCols = currentRow.getElementsByTagName("td");
    return currentCols;
}


Game.prototype.doTick = function() {
    var eloCorrFirst = this.homeTeamElo - this.homeGoals*Game.GOAL_DIM;
    var eloCorrSecond    = this.awayTeamElo-Game.HOUSE_ADV - this.awayGoals*Game.GOAL_DIM;

    var coeffFirst = eloCorrFirst*Game.ELO_ATT -eloCorrSecond*Game.ELO_DIFF;
    var coeffSecond =eloCorrSecond*Game.ELO_ATT-eloCorrFirst*Game.ELO_DIFF;

    var randNumberFirst = Math.random()*Game.BASE_TEST;
    var randNumberSecond = Math.random()*Game.BASE_TEST;

    if (randNumberFirst < coeffFirst) {
        this.homeGoals++;
        this.addResultToTicker();
    } else if (randNumberSecond < coeffSecond) {
        this.awayGoals++;
        this.addResultToTicker(this);
    }

}


Game.prototype.writeCommonResult = function(roundIndex) {
    var currentCols = this.getCurrentCols(roundIndex);
    currentCols[0].innerHTML = this.homeTeamName+"-"+this.awayTeamName;
    currentCols[1].innerHTML = this.homeGoals+"-"+this.awayGoals;
}


Game.prototype.executePlay = function(elRoundCols, rowIndex) {
    this.doPlay();
    this.updateResult(elRoundCols, rowIndex);
    this.finalizeResult();
    this.enterResult();
}


Game.prototype.executeTick = function(elRoundCols, rowIndex) {
    this.doTick();
    this.updateResult(elRoundCols, rowIndex);
}

function FirstHalfGame(homeTeamName, awayTeamName, leagueArg) {
    Game.call(this,homeTeamName,awayTeamName,leagueArg);
}

FirstHalfGame.prototype = new Game();
FirstHalfGame.prototype.constructor = FirstHalfGame;

FirstHalfGame.prototype.updateResult = function (elRoundCols , roundIndex) {
    this.writeCommonResult(roundIndex);
}

function SecondHalfGame(homeTeamName, awayTeamName, league) {
    Game.call(this,homeTeamName,awayTeamName,league);
}

SecondHalfGame.prototype = new Game();
SecondHalfGame.prototype.constructor = SecondHalfGame;

SecondHalfGame.prototype.updateResult = function (elRoundCols , roundIndex) {
    this.writeCommonResult(roundIndex);
}

FirstHalfGame.prototype.enterResult = function (elRoundCols , roundIndex) {
    elRoundCols[0].innerHTML = this.homeGoals+"-"+this.awayGoals;
}


SecondHalfGame.prototype.enterResult = function (elRoundCols , roundIndex) {
    elRoundCols[2].innerHTML = this.awayGoals+"-"+this.homeGoals;
}

function Round(league, roundNumber, bergerTable) {
    this.league = league;
    this.roundNumber = roundNumber;
    this.bergerTable = bergerTable;
    this.minutes = 0;
    this.updatedStrings = ["-- ROUND "+(roundNumber+1)+ " --"];
    document.getElementById("lastResultId").value = this.updatedStrings[0].innerHTML;
    this.games = [];
    for (var gameIndex = 0; gameIndex < league.gamesForRounds; gameIndex++) {
        var teamNames = bergerTable.getTeamNamesForRound(roundNumber, gameIndex );
        var game = this.createGame(teamNames[0], teamNames[1], league, roundNumber);
        game.round = this;
        this.games.push(game);
    }
    this.finalized = false;
}

Round.prototype.execute = function(gameFunc) {
    var tableToChoose = this.roundNumber % 19;
    var elRounds = document.getElementById("Rounds");
    var elRoundTables = elRounds.getElementsByTagName("table");
    var elRoundTable = elRoundTables[tableToChoose];
    var elRoundRows = elRoundTable.getElementsByTagName("tr");
    var currentRoundSpan = document.getElementById("currentRoundSpan");
    var spanHTML = "Round "+(this.roundNumber+1)+ " /  Min : "+Math.min(this.minutes, Game.TICK_MAX);
    if (this.minutes >= Game.TICK_MAX) {

        if (this.roundNumber+1 >=  ROUND_TOT) {
            spanHTML   += " ..CHAMP OVER.. RESTART..-"
        } else {
            spanHTML  += " ..WAIT.. ";
        }
    }

    currentRoundSpan.innerHTML = spanHTML;
    document.getElementById("roundId").innerHTML = currentRoundSpan.innerHTML;
    for (var rowIndex = 2; rowIndex < 12; rowIndex++) {
        var elRoundRow = elRoundRows[rowIndex];
        var elRoundCols = elRoundRow.getElementsByTagName("td");
        var game = this.games[rowIndex-2];
        gameFunc.call(game, elRoundCols, rowIndex);
    }
}



Round.prototype.tick = function() {
    if (this.minutes <= Game.TICK_MAX ) {
        this.execute(Game.prototype.executeTick);
    }
    this.minutes++;
    if (this.minutes == Game.TICK_MAX+2) {
        var lastResultIdEl = document.getElementById("lastResultId")
        if ((this.roundNumber+1) >= ROUND_TOT) {
            lastResultIdEl.value  += "\r\nEND OF CHAMPIONSHIP..RESTART..."
        } else {
            lastResultIdEl.value += "\r\nEND OF ROUND...WAIT..."
        }
        lastResultIdEl.scrollTop = lastResultIdEl.scrollHeight;

    }
}

Round.prototype.resetResult = function() {
    document.getElementById("lastResultId").value = "";
}

Round.prototype.play = function() {
    this.execute(Game.prototype.executePlay);
}

Round.prototype.finalizeResult = function(elRoundCols, rowIndex) {
    this.execute(Game.prototype.finalizeResult);
    this.finalized = true;
}

Round.prototype.isFinalized = function() {
    return this.finalized;
}


Round.prototype.isFinished = function() {
    return this.minutes > Game.TICK_MAX+Game.TICK_AFTER;
}


Round.prototype.createGame = function(firstTeamName, secondTeamName, league, round) {
    var game;
    if (this.roundNumber < league.getRoundsForHalf() ) {
        game = new FirstHalfGame(firstTeamName, secondTeamName, league, this);
    } else {
        game = new SecondHalfGame(secondTeamName, firstTeamName, league, this);
    }
    game.initElos()
    return game;
}



