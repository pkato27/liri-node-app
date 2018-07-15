require("dotenv").config();


var keys = require("./keys.js")
//twitter
// var Twitter = require('twitter');
//movie
var request = require('request');
//spotify
var Spotify = require('node-spotify-api');



// var getTweets = function () {

//   // new twitter constructor, building new objects named client passing in twitter keys from keys.js file
//   var client = new Twitter(keys.twitter);

//   var params = {
//     screen_name: 'PhillyDog12'
//   };
//   client.get('statuses/user_timeline', params, function (error, tweets, response) {
//     if (!error) {
      
//      for(i = 0; i < tweets.length; i++){
//       console.log(tweets[i].created_at);
//       console.log("");

//       console.log(tweets[i].text);

//      }
      
//     }

//   });

// }
// getTweets();

var getMovie = (movieName) =>{
  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(url, function (error, response, body) {
    if(error){console.log('error:', error)}; // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    let jsonData = JSON.parse(body);
    console.log('Title: ' + jsonData.Title + " | "+
                'Year: ' + jsonData.Year + " | "+ 
                'Rated: ' + jsonData.Rated + " | "+
                'Country: ' + jsonData.Country + " | "+
                'language ' + jsonData.Language + " | "+
                'Plot: ' + jsonData.Plot);
                

  });

}











// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

//Spotify

// var getSpotify = function(songName){
//   var spotify = new Spotify(keys.spotify);

//   var songName = "next episode";
//   spotify.search({ type: 'track', query: songName,limit: 5 }, function(err, data,) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     } else {
//       console.log("song Name: " + "' " + songName + "' " + "Album name: " + data.tracks.items[0].album.name);
//     }
   
  

//   });
// }

// getSpotify();

let pick = function(caseData, functionData) {
  switch(caseData){
    case 'movie-this':
    getMovie(functionData);
    default:
    // console.log("NOPE");
  }
}


let runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
