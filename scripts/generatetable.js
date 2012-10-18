/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 28.09.12
 * Time: 20:21
 * To change this template use File | Settings | File Templates.
 */




function printInClassifica(championShip) {
    championShip.sortTeams();
    var elClassifica = document.getElementById("classifica");
    var elClassBody = elClassifica.getElementsByTagName("tbody")[0];
    var elClassTrs = elClassBody.getElementsByTagName("tr");
    var teams = championShip.getTeams();

    for (var teamIndex = 0; teamIndex < 20; teamIndex++) {
        var currentTeam = teams[teamIndex];
        var elCurrentRow = elClassTrs[teamIndex];
        var allColumns = elCurrentRow.getElementsByTagName("td");
        for (var column = 0; column  < allColumns.length; column++) {
            allColumns[column].innerHTML = "";
        }
        allColumns[1].innerHTML = teamIndex+1;
        allColumns[2].innerHTML = currentTeam.teamName;
        allColumns[3].innerHTML = currentTeam.points.toString();
        allColumns[4].innerHTML = currentTeam.played;

        allColumns[5].innerHTML = currentTeam.wins.toString();
        allColumns[6].innerHTML = currentTeam.draw.toString();
        allColumns[7].innerHTML = currentTeam.lost.toString();
        allColumns[8].innerHTML = currentTeam.goalsmade.toString();
        allColumns[9].innerHTML = currentTeam.goalstaken.toString();
        allColumns[10].innerHTML = currentTeam.goalsdiff().toString();

    }
}




function cycleRoundTables(bergerTable, elRoundTables, funcGame ) {
    for (var tableIndex = 0; tableIndex < ROUND_NUM ; tableIndex++) {
        var elRoundTable = elRoundTables[tableIndex];
        var elRoundRows = elRoundTable.getElementsByTagName("tr");
        for (var rowIndex = 2; rowIndex < 12; rowIndex++) {
            var elRoundRow = elRoundRows[rowIndex];
            var elRoundCols = elRoundRow.getElementsByTagName("td");
            var teamNames = bergerTable.getTeamNamesForRound(tableIndex , rowIndex-2);
            funcGame(teamNames, elRoundCols  )
        }
    }
}


function printRoundsTeams(bergerTable) {
    var elRounds = document.getElementById("Rounds");
    var elRoundTables = elRounds.getElementsByTagName("table");
    cycleRoundTables(bergerTable, elRoundTables, function(teamNames, elRoundCols) { //teamNames
            var elTeamCol = elRoundCols[1];
            elTeamCol.innerHTML = teamNames[0]+"-"+teamNames[1];
        }
    );
}

function resetTables() {
    var elRounds = document.getElementById("Rounds");
    var elRoundTables = elRounds.getElementsByTagName("table");

    for (var tableIndex = 0; tableIndex < ROUND_NUM ; tableIndex++) {
        var elRoundTable = elRoundTables[tableIndex];
        var elRoundRows = elRoundTable.getElementsByTagName("tr");
        for (var rowIndex = 2; rowIndex < 12; rowIndex++) {
            var elRoundRow = elRoundRows[rowIndex];
            var elRoundCols = elRoundRow.getElementsByTagName("td");
            elRoundCols[0].innerHTML = "#";
            elRoundCols[1].innerHTML = "#";
            elRoundCols[2].innerHTML = "#";
        }
    }

    var elClassifica = document.getElementById("classifica");
    var elClassBody = elClassifica.getElementsByTagName("tbody")[0];
    var elClassTrs = elClassBody.getElementsByTagName("tr");
    var teams = championShip.getTeams();

    for (var teamIndex = 0; teamIndex < 20; teamIndex++) {
        var currentTeam = teams[teamIndex];
        var elCurrentRow = elClassTrs[teamIndex];
        var allColumns = elCurrentRow.getElementsByTagName("td");
        for (var column = 0; column  < allColumns.length; column++) {
            allColumns[column].innerHTML = "#";
        }
    }
}

