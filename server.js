var express = require('express'),
    curl = require('node-curl'),
    app = express(),
    mws = require('./mws'),

    // We need the amazon keys:
    // './.secret.key.js' is a file that should look like this:
    //   exports.keys = {
    //     accessKeyId: '{key}',
    //     secretAccessKey: '{key}',
    //     merchantId: '{key}',
    //     marketplaceId: '{key}'
    //   };
    auth = require('./.secret.key.js');
    client = new mws.AmazonMws.Client(auth.keys.accessKeyId, auth.keys.secretAccessKey, auth.keys.merchantId, {});


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", (req.headers.oirgin || "*"));
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  next();
});

app.get('/mws/:uri/:method', function(req, res) {
  var params = req.params;
  var uri = mws[params.uri];
  if( uri && uri.requests[params.method]) {
    var request = new uri.requests[params.method]();
   
    if(request.params['MarketplaceId']) {
      request.set('MarketplaceId',auth.keys.marketplaceId);
    }
    for(var prop in req.query) {
      request.set(prop, req.query[prop]);
    }
    client.invoke(request,
      function(result){
        res.send(result);
      }
    );
   } else {
    res.send({'error':'Doesn\'t exist in API.'});
  }
});

var server = app.listen(5555, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('5\'s a great number! Localhost:5555');

});
