var express = require('express')
  , app     = express()
  , emphn		= require('empleoshn.js')
  , port    = process.env.PORT || 3000;


app.configure(function(){
  app.use(express.static(__dirname + 'public'));
});

app.get('/job', function(req, res){
	res.writeHead(200, {'Content-Type': 'application/json'});
	emphn(10, res);
});

app.listen(port);
console.log('Express server listening on port ' + port);