var express = require('express')
  , app = express()
  , buff// = require('buffer')
  , empleosHn = require('empleoshn.js');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

buff = '<h1>Ofertas de trabajo</h1>';
empleosHn(10, buff);

app.set('title', 'Bolsa de trabajo');
app.get('title');
app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(buff.toString('utf-8'));
});

app.listen(3000);

console.log('Listening port 3000');