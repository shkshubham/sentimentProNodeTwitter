const express = require('express')

//sentiment api
const sentiment = require('sentiment');

//keys for twitter
const keys = require('./config/keys')

//twitter api
const Twit = require('twit');

const app = express()

//making new twitter object
var twitter = new Twit(keys.twitter)

//list var to show on browser
var twitsScore = []

//params to pass on twitter api change q for seaching different tweets
var params = {
  q: 'india',
  count: 50
}

//doing get req to search tweets
twitter.get('search/tweets', params,search)

//search fuction for above code
function search(err, data, response) {

  var twitsObj = {} //creating object of all tweets

  //looping throw statuses list to get it' objects
  data.statuses.forEach(function (twits) {

    var sent = sentiment(twits.text) //checking score of tweets

    //creating object of tweets and sentiment object together
    twitsObj = {
      tweets: twits.text,
      sentiment: sent
    }

    //pushing twitsObj to twitsScore list
    twitsScore.push(twitsObj)
  })

  //express app to make get req on /
  app.get('/', function(req, res){
    //sending twitsScore list as a response to the browser which contains
    //tweets and thier scores and sentiment data with them
    res.send(twitsScore)
    console.log(twitsScore)
  })
}

//listening to port 8000
app.listen(8000)
