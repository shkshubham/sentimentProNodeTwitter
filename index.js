const express = require('express')
const sentiment = require('sentiment');
const keys = require('./config/keys')
const Twit = require('twit');
const app = express()

var twitter = new Twit(keys.twitter)
var twitsScore = []

var params = {
  q: 'nodejs',
  count: 50
}

twitter.get('search/tweets', params,search)

function search(err, data, response) {
  var twitsObj = {}
  data.statuses.forEach(function (twits) {
    var sent = sentiment(twits.text)
    twitsObj = {
      text: twits.text,
      sentiment: sent
    }
    twitsScore.push(twitsObj)
  })
  app.get('/', function(req, res){
    res.send(twitsScore)
    console.log(twitsScore)
  })
}

app.listen(8000)
