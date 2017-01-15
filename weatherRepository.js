var weatherRepository = {
    getForecastByCity: getForecastByCity,
    getForecastByCoordinates: getForecastByCoordinates
};

module.exports = weatherRepository;

var rp = require('request-promise');

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

function getForecastByCity(city){
    options.qs.q = city + ',us';
    return rp(options);
}

function getForecastByCoordinates(lat, lon){
    options.qs.lat = lat;
    options.qs.lon = lon;
    return rp(options);
}