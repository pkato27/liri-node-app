require("dotenv").config();


var keys = require("./keys.js")
//twitter
var Twitter = require('twitter');
//movie
var request = require('request');
//spotify
var Spotify = require('node-spotify-api');



var getTweets = function () {

  // new twitter constructor, building new objects named client passing in twitter keys from keys.js file
  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: 'PhillyDog12'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      
     for(i = 0; i < tweets.length; i++){
      console.log(tweets[i].created_at);
      console.log("");

      console.log("This is my tweet: " + tweets[i].text);

     }
      
    }

  });

}


var getMovie = (movieName) =>{
  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(url, function (error, response, body) {
    if(error){console.log('error:', error)}; 

    let jsonData = JSON.parse(body);
    console.log('Title: ' + jsonData.Title + " | "+
                'Year: ' + jsonData.Year + " | "+ 
                'Rated: ' + jsonData.Rated + " | "+
                'Country: ' + jsonData.Country + " | "+
                'language ' + jsonData.Language + " | "+
                'Plot: ' + jsonData.Plot);
  });
}


//Spotify

var getSpotify = function(songName){
  var spotify = new Spotify(keys.spotify);


  spotify.search({ type: 'track', query: songName,limit: 5 }, function(err, data,) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name +":"+" song Name: "  + songName + ":" + "Album name: " + data.tracks.items[0].album.name);
    }
   
  

  });
}



let pick = function(caseData, functionData) {
  switch(caseData){
    case 'movie-this':
    getMovie(functionData);
      break;
    case 'my-tweets':
    getTweets(functionData);
      break;
    case 'spotify-this-song':
    getSpotify(functionData);
      break;
    default:
    console.log("Did not work")
   
  }
}


let runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`?