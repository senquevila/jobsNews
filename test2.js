var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var utilStr = require('utilString.js');
var urls = ["http://www.empleos.hn/index.php?cat=90"]
var tag = 'table#joblist tr';
var data = [];

var req = function(url){
  request({uri: url}, function(error, response, body) {
    var $ = cheerio.load(body);
    $(tag).each(function() { 
      var tr = $(this);
      var json = {fecha:"", descripcion:"", lugar:""};

      json.fecha = utilStr.clearSpace(tr.children().first().text());
      json.descripcion = utilStr.clearSpace(tr.children().first().next().html());
      json.lugar = utilStr.clearSpace(tr.children().last().text());

      data.push(json);
    });
    fs.writeFile("output.json", JSON.stringify(data, null, 4), function(err){
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