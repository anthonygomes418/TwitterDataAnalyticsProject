var r = require('rethinkdb'),
      connection;
var Twit = require('twit');
var util = require('util');

var T = new Twit({
    consumer_key:'O9ys1nNI2fWNZMWIwKBX3Q'
    ,consumer_secret:'n2bv9jstToSHNW1eBMkiXaUqwYwS2hxltFqABwhkjaw'
    ,access_token:'47155115-6bqwssOBeGPxDn9tH0OXukk0nWaxmcVgildvHPI16'
    ,access_token_secret:'NsgCFmiQiBtgn5CEBulatuds1KrZJr8vXDZa0KXfq0'
})


  r.connect( {host: 'localhost', port: 28016}, function(err, conn) {
    if (err) throw err;
    connection = conn;
  

     RetrieveTwitter(); 
      }); 
//Twitter Stuff 

RetrieveTwitter = function() {
console.log("Tweet Stream Start");
//Tracks multiple screen names at one time. 
var stream = T.stream('user', { track:'FoxNews' } && { track:'WhiteHouse' })

stream.on('tweet', function (tweet) {
//r.db('Twitter').table('Twitt').run(connection)
r.db('Twitter').table("Twitt").insert({
 username : tweet.user.name,
   userid: tweet.user.id,
   fid: tweet.id,
   data: tweet.created_at,
  text: tweet.text,
  coordinates:tweet.coordinates
}).run(connection)



});

}

