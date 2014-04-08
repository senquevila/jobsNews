var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/jobshn', function(req, res){
	var url = 'http://www.empleos.hn/index.php?cat=90';

	request(url, function(error, response, html){
		if (error) throw error;

		var jsonArray = new Array();

		var $ = cheerio.load(html);

		var fecha, descripcion, lugar;
		var json = {fecha : "", descripcion : "", lugar : ""};

		$('table#joblist tr').each(function(){
			var tr = $(this);
			fecha = tr.children().first().text();
			lugar = tr.children().last().text();

			json.fecha = fecha;
			json.lugar = lugar;

			console.log(json);

			jsonArray.push(json);
		});

		var fd = open('output.json', 'a');

		fs.writeFile(fd, JSON.stringify(json, null, 4), function(err){
			console.log('Escrito exitosamente');
		});

		res.send('Terminado');
	});
});

app.listen('3000');
console.log('Escuchando en puerto 3000');

exports = module.exports = app;