var express = require('express')
  , download = require('download.js')
  , cheerio = require('cheerio')
	, app = express()
	, url = "http://www.empleos.hn/index.php?cat=90"
	, element = "a.job_list_title";



app.set('title', 'Bolsa de trabajo');
app.get('title');

app.get('/', function(req, res){
	res.send('<h1>Ofertas de trabajo recientes</h1>');

	for (var i = 0; i < 10; i++) {
		var offset = i * 10;
		var p_url = url + '&offset=' + offset;

    download(p_url, function(data) {
      if (data) {
        //console.log(data);

        var $ = cheerio.load(data);

        $(element).each(function(i, e) {
            var chunk = $(e).text();

            console.log(chunk);
            res.set('Content-Type', 'text/html');
            res.send(chunk);
          });
          
        console.log("done");
      }
      else console.log("error");  
    });
	}
});

app.listen(3000);

console.log('Listening port 3000');