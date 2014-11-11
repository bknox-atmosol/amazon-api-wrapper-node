var express = require('express'),
    curl = require('node-curl'),
    app = express(),
    mws = require('./mws'),
    keys = require('./.secret.key.js');
    client = new mws.AmazonMws.Client(keys.accessKeyId, keys.secretAccessKey, keys.merchantId, {});


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", (req.headers.oirgin || "*"));
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  next();
});

app.get('/mws/:endpoint/:method', function(req, res) {
  var params = req.params;
  var request = new mws[params.endpoint].requests[params.method]();
  if(request.params['MarketplaceId']) {
    request.set('MarketplaceId',marketplaceId);
  }
  for(var prop in req.query) {
    request.set(prop, req.query[prop]);
  }
  client.invoke(request,
    function(result){
      res.send(result);
    }
  );
});

var server = app.listen(5555, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('5\'s a great number! Localhost:5555');

});
