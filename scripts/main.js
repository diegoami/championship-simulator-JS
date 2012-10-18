/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 28.09.12
 * Time: 20:21
 * To change this template use File | Settings | File Templates.
 */

var ROUND_NUM = 19;
var ROUND_TOT = ROUND_NUM*2;
var max_interval = 600;
var interval = max_interval/2;

var inc_interval = 20;


var roundInterval = null;
var currentRound;
var currentLeague;
var championShip;
var twentyBergerTable;


function executeRoundTick() {
    if (typeof(currentRound ) == "undefined" || currentRound.isFinished() ) {
        if (roundTick < ROUND_TOT) {
            currentRound = new Round(currentLeague,roundTick, twentyBergerTable);
            currentRound.resetResult();
            roundTick++;
        } else {
            if (null != roundInterval) {
                clearInterval(roundInterval);
                roundInterval = null;
            }
        }
    }
    if (roundTick <= ROUND_TOT) {
        currentRound.tick();
        if (currentRound.isFinished() && (!currentRound.isFinalized())) {
            currentRound.finalizeResult();

            printInClassifica(championShip);
        }
    }

}



function firstcall() {
   var leagueId = getCookie("leagueId");
   var cookie_interval = getCookie("interval");
   if ((leagueId !=null && leagueId !="")) {
       var leagueEl = document.getElementById("league");
       if (leagueId   >= 0) {
           leagueEl.selectedIndex =leagueId ;
       }

   }
   if ((cookie_interval !=null && cookie_interval !=""  && cookie_interval > 0)) {
      interval = Number(cookie_interval);
   } else {
       interval = max_interval/2;
   }

    restart();
}

function getFileName(param) {
    var leagueName = param || 'europe';
    //var leagueFile = 'file:///D:/develop/championship/json/'+leagueName +'league.json';
    //
    var leagueFile = 'json/'+leagueName +'league.json';

    return leagueFile;



}


function main(leagueName) {


    var fileName = getFileName(leagueName);
    $.getJSON(fileName, function(data) {
        currentLeague = new League(data);
        var teamNames = currentLeague.getTeamNames();
        championShip = new ChampionShip(teamNames);
        twentyBergerTable = new BergerTable(ROUND_NUM , ROUND_NUM+1, teamNames);;

        resetTables();
        printRoundsTeams(twentyBergerTable);
        printInClassifica(championShip);

        executeRoundTick();
        go();
    });

}


function pause() {
    if (null != roundInterval) {
        clearInterval(roundInterval);
        roundInterval = null;
        document.getElementById("pause").disabled=true;
        document.getElementById("go").disabled=false;
    }
}

function updateInterval() {
    var ret_interval = max_interval - interval;
    document.getElementById("progressid").value = ret_interval;
    setCookie("interval",interval);
}

function go() {
    if (null ===  roundInterval) {
        roundInterval = setInterval(executeRoundTick, interval);
        document.getElementById("pause").disabled=false;
        document.getElementById("go").disabled=true ;
    }
    updateInterval();
}

function faster() {
    if (null != roundInterval) {
        clearInterval(roundInterval)
        roundInterval = null;
    }
    interval -= inc_interval;
    if (interval < inc_interval) {
        interval = inc_interval;
    }
    go();
}

function slower() {
    if (null != roundInterval) {
        clearInterval(roundInterval);
        roundInterval = null;
    }
    interval += inc_interval;
    if (interval >= max_interval) {
        interval = max_interval;
    }
    go();
}

function restart() {
    roundTick = 0;
    currentRound = undefined;
    if (null != roundInterval) {
        clearInterval(roundInterval)
        roundInterval = null;

    }

    var leagueEl = document.getElementById("league");
    var selIndex = leagueEl.selectedIndex;
    if (selIndex  >= 0) {
        leagueName = leagueEl.options[selIndex].text.toLowerCase();
        setCookie("leagueId",selIndex );
    }
    main(leagueName );
}