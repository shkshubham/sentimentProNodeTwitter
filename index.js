const express = require('express')
const app = express()


app.get('/', function(req, res){
  res.send('home')

});

app.get('/twitter', function(req, res){
  res.send('twiiter')

});

app.listen(3000)
