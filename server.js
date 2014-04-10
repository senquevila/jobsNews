var express = require('express');
var app = express();
var emphn = require('empleos_hn.js');
var urls = ["http://www.empleos.hn/index.php?cat=90"];

app.get('/jobshn', function(req, res){  
  emphn.toJSON(urls, res);
});

app.listen('3000');
console.log('Escuchando en puerto 3000');

exports = module.exports = app;