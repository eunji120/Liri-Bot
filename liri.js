
require("dotenv").config();

//loading modules
var keys = require("./keys");
var spotify = require(keys.spotify);
var request = require('request');
var fs = require('fs');
var inputComm = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "Frozen";
var defaultSong = "Sorry Not Sorry"; 


//function processing the input commands
function processCommands(command, commandParam) {
    switch(command) {
        case 'spotify-this-song':
            //if a song is not specified -> default
            if(commandParam === undefined) {
                commandParam = defaultSong;
            }
            spotifyThis(commandParam); break;
        case 'movie-this':
            //if a movie is not specified -> default
            if(commandParam === undefiend) {
                commandParam = defaultMovie;
            }
            movieThis(commandParam); break;
        case 'do-what-it-says':
            doWhatItSays(); break;
        default:
            console.log("Invalid command. Please type any of the following commands: spotify-this-song, movie-this or do-what-it-says");
    }
}

function spotifyThis(song) {
    //if a song is not specified, then default song
    if(song === "") {
        song = "Sorry Not Sorry"
    }

    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var song = data.tracks.items[0];
        console.log("-------Artists-------");
        for(i = 0; i < song.artists.length; i++) {
            console.log(song.artists[i].name);
        }

        console.log("-------Song Name-------");
        console.log(song.name);

        console.log("------Preview Link------");
        console.log(song.preview_url);

        console.log("-------Album-------");
        console.log(song.album.name);
    });
}

function movieThis() {

    //get movie ID
    var movieID = JSON.parse(body).results[0].id;
    //create new query using the movie ID
    var queryURL ="http://www.omdbapi.com/?t=" + movieID + "&y=&plot=short&apikey=trilogy";
    
    request(queryURL, function(error, response, body) {

        if(!error && response.statusCode === 200) {
            var movieObj = JSON.parse(body);

                console.log("-------Title-------");
                console.log(movieObj.data.Title);

                console.log("-------Year-------");
                console.log(movieObj.data.Year);

                console.log("-------Rating-------");
                console.log(movieObj.Ratings[0].Value);
                if (data.Ratings[1]) {
                    console.log(movieObj.Ratings[1].Value);
                }

                console.log("-------Country-------");
                console.log(movieObj.data.Country);

                console.log("-------Languages-------");
                console.log(movieObj.data.Languages);

                console.log("-------Plot-------");
                console.log(movieObj.data.Plot);

                console.log("-------Actors-------");
                console.log(movieObj.data.Actors);
            } else {
        console.log(error);
    }
})
};

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        var dataArr = data.split(',');
        processCommands(dataArr[0], dataArr[1]);
    });
}

//main process
processCommands(inputComm, commandParam);