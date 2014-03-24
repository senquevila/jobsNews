var request = require('request')
	, cheerio = require('cheerio')
	, http = require('http')
	, url = "http://www.empleos.hn/index.php?cat=90"
	, id = "#joblist"
	, htmlStr = '';

for (var i = 0; i < 10; i++) {
	var real_url = url + '&offset=' + (i*10);
	request(real_url, function(err, resp, body) {
		//console.log(real_url);
    if (err)
      throw err;
    $ = cheerio.load(body);
    htmlStr += $(id).html();
  });
}

console.log(htmlStr);