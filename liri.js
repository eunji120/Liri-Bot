js 
require("dotenv").config();

//loading modules
var keys = require("./keys.js");
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var inputComm = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "Frozen";
var defaultSong = "Sorry Not Sorry";
var omdbKey = keys.omdbKey; 


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

function movieThis(movieName) {
    console.log(movieName);
    request("http://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey + "&query=" + movieName, function(error, response, body) {
    
    if(!error && response.statusCode === 200) {
        //get Movie ID
        var movieID = JSON.parse(body).results[0].id;

        var queryURL ="";

        request(queryURL, function(error, response, body) {
            var movieObj = JSON.parse(body);

            console.log("-------Title-------");
            console.log(movieObj.origianl_title);

            console.log("-------Year-------");
            console.log(movieObj.release_date);

            console.log("-------Rating-------");
            console.log(movieObj)

            console.log("-------Country-------");

            console.log("-------Languages-------");

            console.log("-------Plot-------");

            console.log("-------Actors-------");
        });
    } else {
        console.log(error);
    }
    });
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        processCommands(dataArr[0], dataArr[1]);
    });
}

//main process
processCommands(inputComm, commandParam);