var express = require('express');
var app = express();
var rp = require('request-promise');
var forecastManager = require('./forecastManager.js')
app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.get('/forecast', function(req, res) {

    var options = {
        uri: 'http://api.openweathermap.org/data/2.5/forecast',
        qs: {
            //q: req.query.city + ',us',
            mode: 'json',
            appid: '332eb0680074a9117be05b62c224af22',
            units: 'imperial'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    if (req.query.city) {
        forecastManager.getForecastByCity(req.query.city)
        //options.qs.q = req.query.city + ',us';
        //rp(options)
            .then(function(forecast) {
                console.log('User has %d repos', forecast);
                res.json(forecast);
            })
            .catch(function(err) {
                // API call failed...
                console.log('rest call error ', err);
                res.send('error');
            });

    }
    else if (req.query.zip) {
        forecastManager.getForecastByZipCode(req.query.zip)
        //var coordinatesPromise = getLatLongForZipCode(req.query.zip);

        // coordinatesPromise
        //     .then(function(coordinates) {
        //         console.log('coordinates ', coordinates);
        //         options.qs.lat = coordinates.postalcodes[0].lat;
        //         options.qs.lon = coordinates.postalcodes[0].lng;
        //         return rp(options);
        //     })
            .then(function(forecast) {
               // console.log('User has %d repos', forecast);
                res.json(forecast);
            })
            .catch(function(err) {
                // API call failed...
                console.log('rest call error ', err);
                res.json(err);
            });
    }
    else {
        res.json({
            error: 'please provide a city or zip parameter on the query string'
        })
    }


});

//http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&country=AT&username=demo

app.get('/city', function(req, res) {
    getLatLongForZipCode('57006')
        .then(function(coordinates) {
            console.log('coordinates ', coordinates);
            res.json(coordinates);
        })
        .catch(function(err) {
            // API call failed...
            console.log('rest call error ', err);
            res.send('error');
        });
});


function getLatLongForZipCode(zipCode) {
    var options = {
        uri: 'http://api.geonames.org/postalCodeLookupJSON',
        qs: {
            country: 'USA',
            postalcode: zipCode,
            username: 'nrccua_test'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);

}

app.listen(process.env.PORT, function() {
    console.log('Example app listening on port ', process.env.PORT);
    console.log('ip: ', process.env.IP);
});
