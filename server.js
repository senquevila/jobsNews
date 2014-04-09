var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var utilStr = require('utilString.js');
var async = require('async');
var app = express();

app.get('/jobshn', function(req, res){
  var url = 'http://www.empleos.hn/index.php?cat=90';

  fs.writeFileSync('output.json', '', {flag: 'w'});

  request(url, function(error, response, html){
    if (error) throw error;

    var jsonArray = [];

    var $ = cheerio.load(html);

    var fecha, descripcion, lugar;
    var json = {fecha : "", descripcion : "", lugar : ""};
    var items = $('table#joblist tr');
    var counter = items.length;

    console.log(counter);

    $('table#joblist tr').each(function(){
      var tr = $(this);
      var elemento = tr.children().first();
      fecha = elemento.text();
      descripcion = elemento.next().text();
      lugar = tr.children().last().text();

      json.fecha = utilStr.cleanBlankSpace(fecha);
      json.lugar = utilStr.cleanBlankSpace(lugar);
      json.descripcion = utilStr.cleanBlankSpace(descripcion);

      counter--;

      console.log(counter);

      jsonArray.push(json);

      fs.writeFile('output.json', JSON.stringify(json, null, 4), {flag: "a"}, function(err){
        console.log('Escrito exitosamente');
      });
    });

    console.log('termino');
  });
});

app.listen('3000');
console.log('Escuchando en puerto 3000');

exports = module.exports = app;