var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var urls = ["http://www.tegucigalpa.diplo.de/Vertretung/tegucigalpa/es/06/Studieren__in__Deutschland/Becas__posgrado__Seite__es.html"]
var data = [];

var req = function(url){
    request({uri: url}, function(error, response, body) {
        var $ = cheerio.load(body);
		$("a").each(function() { 
		  var link = $(this);
		  var itri = {iti: new Array(link.attr("href"))}
		  data.push( itri );
		});
		fs.writeFile("file.json", JSON.stringify(data), function(err){
		  if(err)
		  	console.log(err); 
		  else console.log("archivo guardado..");
		});
	})
}

for (var i = 0; i < urls.length; i++){
    req(urls[i]);
}

console.log("cargando...");