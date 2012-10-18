/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 14.10.12
 * Time: 16:03
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');



fs.readFile('txts/uefa2rating.txt', 'utf8', function process(err, data) {
        console.log(data);
        lines = data.split('\r\n');
        console.log(lines);
        var ratings = {};

        for (var i = 0; i < lines.length; i++) {
            var lineArray = lines[i].split('\t');
            teamName = lineArray[1];
            rating = Number(lineArray[4]);
            console.log(teamName +" : "+rating);
            ratings[teamName] = rating;
        }

        console.log(ratings);
        console.log(JSON.stringify(ratings));
    }

);
