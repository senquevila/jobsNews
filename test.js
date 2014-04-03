var express = require('express')
  , app = express()
  , buff;

buff = '<h1>Ofertas de trabajo</h1>';

app.set('title', 'Bolsa de trabajo');
app.get('title');
app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Hola</h1>');
  for (var i = 0; i < 5; i++) {	
  	res.write('Esto es el numero ' + i + '\n');	
  }
  res.end('Fin')
});

app.listen(3000);

console.log('Listening port 3000');