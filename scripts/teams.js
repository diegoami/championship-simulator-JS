/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 29.09.12
 * Time: 23:36
 * To change this template use File | Settings | File Templates.
 */



function League(teamRatings) {
    this.teamRatings = teamRatings;
    this.gamesForRounds = this.getTeamNames().length/2;
    this.roundsForHalf = this.gamesForRounds*2-1;
}

League.prototype.getGamesForRounds = function() {
    return this.gamesForRounds;
}

League.prototype.getRoundsForHalf = function() {
    return this.roundsForHalf ;
}


League.prototype.getTeamNames = function() {
    var teamKeys = Object.keys(this.teamRatings);
    teamKeys.sort(function() {
        return (Math.round(Math.random()) - 0.5);
    });
    return teamKeys;
}

League.prototype.getTeams = function() {
    var teamNames = this.getTeamNames();
    var teamRet = [];
    for (var teamIndex = 0; teamIndex < teamNames.length; teamIndex++) {
        teamRet[teamIndex] = new Team(teamNames[teamIndex]);
    }
    return teamRet;

}



League.prototype.getTeamElo = function(teamName) {
    return this.teamRatings[teamName];
}


