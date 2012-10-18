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


var worldLeague = new League(

    {

        "Spain" : 2135,
        "Brazil" : 2041,
        "Germany" : 2019,
        "Argentina" : 1952,
        "Netherlands" : 1947,
        "England" : 1947,
        "Portugal" : 1922,
        "Uruguay" : 1894,
        "Mexico" : 1887,
        "Italy" : 1876,
        "Colombia" : 1863,
        "Sweden" :  1850,
        "Russia" : 1847,
        "France" : 1846,
        "Croatia" : 1840,
        "Chile" : 1833,
        "Ivory Coast" : 1828,
        "Ecuador" : 1807,
        "Switzerland" : 1790,
        "Japan" : 1788
    }

)

var europeanLeague = new League(
    {    "Spain" : 2135,
        "Germany" : 2019,
        "Netherlands" : 1947,
        "England" : 1947,
        "Portugal" : 1922,
        "Italy" : 1876,
        "Sweden" : 1850,
        "Russia" : 1847,
        "France" : 1846,
        "Croatia" : 1840,
        "Switzerland" : 1790,
        "Greece" : 1782,
        "Denmark" : 1760,
        "Czech Republic" : 1751,
        "Turkey" : 1727,
        "Ireland" : 1725,
        "Romania" : 1716,
        "Ukraine" : 1715,
        "Belgium" : 1710,
        "Serbia" : 1704
    })

var italianLeague = new League(

    {    Juventus:2219.48,
        Napoli:2158.81,
        Milan:2085.16,
        Inter:2068.18,
        Lazio:2054.45,
        Roma:2043.84,
        Fiorentina:1998.49,
        Sampdoria:1946.24,
        Torino:1941.32,
        Udinese:1941.05,
        Parma:1934.03,
        Bologna:1918.86,
        Catania:1916.07,
        Genoa:1914.97,
        Chievo:1896.38,
        Atalanta:1895.63,
        Palermo:1893.70,
        Cagliari:1865.01,
        Siena:1859.93,
        Pescara:1810.67
    })


var germanLeague = new League(
    {
        	"FC Bayern München"	:		2349.10,
        	"Borussia Dortmund"	:		2290.67,
        	"FC Schalke 04"		:	2179.38,
        	"Bayer Leverkusen"	:		2137.30,
        	"VfB Stuttgart"		:	2059.68,
        	"Werder Bremen"		:	2046.98,
        	"Eintracht Frankfurt"  :			2037.88,
        	"Hannover 96"		:	2029.73,
        	"Hamburger SV"		:	2028.47,
        	"1899 Hoffenheim"	:		2019.97,
        	"Mönchengladbach"	:		2009.82,
        	"FSV Mainz 05"	    :	2007.99,
        	"1. FC Nürnberg"	:1997.59,
        	"VfL Wolfsburg"	    : 1984.22,
        	"SC Freiburg"	    : 1977.97,
        	"Fortuna Düsseldorf":	1934.03,
        	"SpVgg Greuther Fürth" :	1927.85,
        	"FC Augsburg"	       :1916.71,
        	"Eintracht Braunschweig" :	1879.87,
        	"Hertha BSC Berlin"	   :1877.49
    })


var englishLeague = new League(
    {
        	"Chelsea FC"	: 2264.46,
        	"Manchester City"	:		2259.68,
        	"Manchester United"	:		2250.46,
        	"Arsenal FC"	:		2207.98,
        	"Tottenham Hotspur"	:		2143.17,
        	"Liverpool FC"	:		2142.80,
        	"Everton FC"	:		2101.88,
        	"Newcastle United"	:		2028.95,
        	"Fulham FC"	:		2001.51,
        	"Queens Park Rangers"	:		1976.08,
        	"Sunderland FC"	:		1970.86,
        	"Swansea City"	:		1963.78,
        	"West Ham United"	:		1961.44,
        	"Stoke City"	:		1960.82,
        	"West Bromwich Albion"	:		1959.70,
        	"Aston Villa"	:		1954.72,
        	"Wigan Athletic"	:		1943.01,
        	"Southampton FC"	:		1925.88,
        	"Reading FC"	:		1916.94,
        	"Norwich City"	:		1905.42
    }


)

var spanishLeague = new League(
   {

        	"FC Barcelona"	:		2411.18,
        	"Real Madrid"	:		2356.26,
        	"Atletico Madrid"	:		2205.55,
        	"FC Valencia"	:		2176.62,
        	"Malaga CF"	:		2159.35,
        	"Athletic Bilbao"	:		2086.57,
        	"Sevilla FC"	:		2066.10,
        	"Real Sociedad"	:		2024.65,
        	"CA Osasuna"	:		2012.70,
        	"Betis Sevilla"	:		1989.27,
        	"Real Valladolid"	:		1970.17,
        	"Espanyol Barcelona"	:		1968.13,
        	"Deportivo La Coruna"	:		1965.84,
        	"Rayo Vallecano"	:		1961.91,
        	"Celta de Vigo"	:		1959.32,
        	"RCD Mallorca"	:		1954.62,
        	"Getafe CF"	:		1952.63,
        	"UD Levante Valencia"	:		1945.76,
        	"Real Zaragoza"	:		1935.98,
        	"Granada CF"	:		1895.51
    }
)

var frenchLeague = new League(

    {
        	"Paris Saint-Germain"	:		2168.43,
        	"FSC Lille"	:		2065.18,
        	"Olympique Marseille"	:		2052.11,
        	"Olympique Lyon"	:		2046.26,
        	"Montpellier HSC"	:		1997.39,
        	"Girondins Bordeaux"	:		1991.55,
        	"Stade Rennes"	:		1969.59,
        	"AS Saint-Etienne"	:		1960.65,
        	"Toulouse FC"	:		1931.19,
        	"FC Lorient"	:		1913.04,
        	"SC Bastia"	:		1902.15,
        	"Valenciennes FC"	:		1896.28,
        	"OGC Nice"	:		1888.94,
        	"AS Nancy Lorraine"	:		1858.55,
        	"Evian Thonon Gaillard FC"	:		1853.97,
        	"Stade Reims"	:		1844.91,
        	"AC Ajaccio"	:		1843.97,
        	"FC Sochaux"	:		1840.97,
        	"Stade Brest"	:		1819.68,
        	"AC Troyes"	:		1818.76
    }
)

var uefa1League = new League(
    {

       	    "FC Barcelona" 	: 	2408.86,
        	"Real Madrid"		: 	2358.59,
        	"FC Bayern München"		:	2349.68,
        	"Borussia Dortmund"		:	2289.54,
        	"Chelsea FC"		:	2264.46,
        	"Manchester City"		:	2260.08,
        	"Manchester United"		:	2250.45,
        	"Shakhtar Donezk"		:	2223.90,
        	"Juventus Torino"		:	2216.82,
        	"Arsenal FC"		:	2207.98,
        	"Atletico Madrid"		:	2205.55,
        	"FC Porto"		:	2204.57,
        	"FC Schalke 04"		:	2179.38,
        	"FC Valencia"		:	2176.62,
        	"Paris Saint-Germain"	:		2170.10,
        	"Malaga CF"		:	2159.35,
        	"SSC Napoli"	:		2158.81,
        	"Dinamo Kiev"	:		2144.96,
        	"Tottenham Hotspur"	 :		2143.17,
        	"Liverpool FC"	:		2142.43


    }
)

var uefa2League = new League(
    {

        	"Bayer Leverkusen"	 : 2137.89,
        	"CSKA Moskva"		: 	2134.89,
        	"Zenit St. Petersburg"		: 2133.88,
        	"Benfica Lisboa"		:	2126.85,
        	"Spartak Moskva"		: 2110.56,
        	"Olympiakos Piraeus"		: 	2103.17,
        	"Everton FC"		: 2101.88,
        	"AC Milan"		: 2092.01,
        	"Rubin Kazan"		: 2089.99,
        	"Athletic Bilbao"	: 2086.57,
        	"FC Twente Enschede"		:	2081.78,
        	"Anzhi Machachkala"		:	2078.90,
        	"Ajax Amsterdam"		: 2076.86,
        	"Inter Milan"		:	2070.98,
        	"Sevilla FC"		:	2066.09,
        	"OSC Lille"		:	2065.18,
        	"Metalist Kharkiv"		: 2063.33,
        	"VfB Stuttgart"		:	2060.27,
        	"Lazio Roma"		: 2058.68,
        	"Red Bull Salzburg"		:	2057.14

    }
)
/*
League.getLeague = function(param) {
    switch (param) {
        case "italy" : return italianLeague;
        case "spain" : return spanishLeague;
        case "germany" : return germanLeague;
        case "france"  : return frenchLeague;
        case "england" : return englishLeague;
        case "uefa1" : return uefa1League;
        case "uefa2" : return uefa2League;
        case "europe" : return europeanLeague;
        case "world" : return worldLeague;
        default : return europeanLeague;
    }

}


League.getLeague = function(param) {
    switch (param) {
        case "italy" : return italianLeague;
        case "spain" : return spanishLeague;
        case "germany" : return germanLeague;
        case "france"  : return frenchLeague;
        case "england" : return englishLeague;
        case "uefa1" : return uefa1League;
        case "uefa2" : return uefa2League;
        case "europe" : return europeanLeague;
        case "world" : return worldLeague;
        default : return europeanLeague;
    }

}


*/
