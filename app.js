var express = require('express')
  , download = require('download.js')
  , cheerio = require('cheerio')
  , buff// = require('buffer')
	, app = express()
	, url = "http://www.empleos.hn/index.php?cat=90"
  , localhost = "http://www.empleos.hn/"
	, element = "table#joblist tr";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

buff = '<h1>Ofertas de trabajo</h1>';

for (var i = 0; i < 5; i++) {
  var offset = i * 10;
  var p_url = url + '&offset=' + offset;

  download(p_url, function(data) {
    if (data) {
      var $ = cheerio.load(data.toString('utf-8'));
      buff = '<table>';

      $(element).each(function(i, e) {
        buff += '<tr>';

        //if (i==1){
          var child = $(e.children)[i];
          console.log(i + '::' + $(child).text());
          console.log('..................');
        //}

        $(e.children).each(function(j, e1){
          var childrenStr = $(e1.children).text().trim();
          /*var bShow = false;
          var diff = 0;
          var find = 0;

          if (i == 0)
            bShow = true;
          else if (i > 0 && j == 1) {
            var hoy = new Date();
            var fecha = new Date(childrenStr);
            diff = (hoy - fecha) / 1000 / 3600 / 24;
            if (diff > 10) {
              bShow = false;
            } else {
              bShow = true;
              find = i;
            }
          }

          if (i == find)
            bShow = true;

          if (bShow)
            buff += '<td>' + childrenStr + '</td>';
          */
        });

        buff += '</tr>';
      });
        
      buff += '</table';
    }
    else 
      console.error("error");  
  });
}

app.set('title', 'Bolsa de trabajo');
app.get('title');

app.get('/', function(req, res){

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(buff.toString('utf-8'));
});

app.listen(3000);

console.log('Listening port 3000');