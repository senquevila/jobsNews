var express = require('express')
  , app = express()
  , buff// = require('buffer')
  , empleosHn = require('empleoshn.js');

app.set('title', 'Bolsa de trabajo');
app.get('title');
app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'application/json'});
  empleosHn(10, buff, res);
});

app.listen(3000);

console.log('Listening port 3000');