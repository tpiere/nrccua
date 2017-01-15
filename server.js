var express = require('express'),
    app = express(),
    forecastManager = require('./forecastManager.js');

app.get('/', function(req, res) {
    res.send('use /forecast?city={cityName} or /forecast?zip={zipCode} to retrieve a 5 day forecast');
});

app.get('/forecast', function(req, res) {

    if (req.query.city) {
        forecastManager.getForecastByCity(req.query.city)
            .then(function(forecast) {
                res.json(forecast);
            })
            .catch(function(err) {
                console.log('rest call error ', err);
                res.json(err);
            });

    }
    else if (req.query.zip) {
        forecastManager.getForecastByZipCode(req.query.zip)
            .then(function(forecast) {
                res.json(forecast);
            })
            .catch(function(err) {
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


app.listen(process.env.PORT, function() {
    console.log('Forecast app listening on port ', process.env.PORT);
});
