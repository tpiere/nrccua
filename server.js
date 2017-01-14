var express = require('express');
var app = express();
var rp = require('request-promise');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/forecast', function (req, res) {
  var options = {
    uri: 'http://api.openweathermap.org/data/2.5/forecast',
    qs: {
        q: req.query.city + ',us',
        mode:'json',
        appid:'332eb0680074a9117be05b62c224af22'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (forecast) {
        console.log('User has %d repos', forecast);
        res.json(forecast);
    })
    .catch(function (err) {
        // API call failed...
        console.log('rest call error ', err);
        res.send('error');
    });
});

//http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&country=AT&username=demo

app.get('/city', function (req, res) {
  var options = {
    uri: 'http://api.geonames.org/postalCodeLookupJSON',
    qs: {
        country:'USA',
        postalcode:'78701',
        username:'nrccua_test'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (coordinates) {
        console.log('coordinates ', coordinates);
        res.json(coordinates);
    })
    .catch(function (err) {
        // API call failed...
        console.log('rest call error ', err);
        res.send('error');
    });
});


app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ', process.env.PORT);
  console.log('ip: ', process.env.IP);
});