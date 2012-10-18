/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 29.09.12
 * Time: 23:38
 * To change this template use File | Settings | File Templates.
 */

var WIN_POINTS = 3;

function TeamPosition(teamName) {
    this.teamName= teamName;
    this.reset();
}



TeamPosition.prototype.goalsdiff = function() {
    return this.goalsmade - this.goalstaken;
}

TeamPosition.prototype.reset = function() {
    this.points = 0;
    this.wins = 0;
    this.draw = 0;
    this.lost = 0;
    this.played = 0;
    this.goalsmade = 0;
    this.goalstaken = 0;
}

TeamPosition.sortTeamPositions = function(firstTeam, secondTeam) {
    if (secondTeam.points != firstTeam.points) {
        return secondTeam.points - firstTeam.points;
    }

    if (secondTeam.goalsdiff() != firstTeam.goalsdiff()) {
        return secondTeam.goalsdiff() - firstTeam.goalsdiff();
    }

    return firstTeam.teamName.localeCompare(secondTeam.teamName);

}


function ChampionShip(teamNames) {
    this.teams = [];
    for (var ti = 0; ti < teamNames.length; ti++ ) {
        this.teams[ti] = new TeamPosition(teamNames[ti]);
    }

    this.teams.findTeam = function(teamName)  {
        for (var teamIndex  = 0; teamIndex < this.length; teamIndex++) {
            var teamPosition = this[teamIndex];
            if (teamPosition.teamName === teamName) {
                return teamPosition;
            }
        }
        return undefined;
    };
}




ChampionShip.prototype.getTeams = function() {
    return this.teams;
}

ChampionShip.prototype.getTeam = function(teamName) {
    var team = this.teams.findTeam(teamName);
    return team;
}

ChampionShip.prototype.sortTeams = function () {
    this.teams.sort(TeamPosition.sortTeamPositions);
}

ChampionShip.prototype.addResult = function(firstTeamName, secondTeamName, firstScore, secondScore) {
    var firstTeam = this.getTeam(firstTeamName);
    var secondTeam = this.getTeam(secondTeamName);

    firstTeam.played++;
    secondTeam.played++;

    firstTeam.goalsmade += firstScore;
    secondTeam.goalsmade += secondScore;

    firstTeam.goalstaken += secondScore;
    secondTeam.goalstaken += firstScore;

    if (firstScore > secondScore) {
        firstTeam.wins++;
        secondTeam.lost++;
        firstTeam.points += WIN_POINTS;
    } else if (firstScore == secondScore) {
        firstTeam.draw++;
        secondTeam.draw++;
        firstTeam.points++;
        secondTeam.points++;
    } else if (secondScore > firstScore) {
        secondTeam.wins++;
        firstTeam.lost++;
        secondTeam.points += WIN_POINTS;
    }
}

ChampionShip.prototype.reset = function() {
    for (var teamIndex  = 0; teamIndex < this.teams.length; teamIndex++) {
        var teamPosition = this.teams[teamIndex];
        teamPosition.reset();
    }
}
