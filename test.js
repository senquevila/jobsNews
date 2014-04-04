var express = require('express')
  , app = express()
  , jarray = new Array();
  
jarray[0] = 'hola';
jarray[1] = 'mundo';

console.log(jarray);

app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(jarray));  
  res.write(JSON.stringify(jarray));
  res.end();
});

app.listen(3000);
console.log('Listening port 3000');