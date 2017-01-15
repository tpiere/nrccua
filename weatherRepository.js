var weatherRepository = {
        getForecastByCity: getForecastByCity,
        getForecastByCoordinates: getForecastByCoordinates
    },
    rp = require('request-promise');


module.exports = weatherRepository;

function getDefaultOptions() {
    return {
        uri: 'http://api.openweathermap.org/data/2.5/forecast',
        qs: {
            mode: 'json',
            appid: '332eb0680074a9117be05b62c224af22',
            units: 'imperial'
        },
        json: true
    };
}

function getForecastByCity(city) {
    var options = getDefaultOptions();
    options.qs.q = city + ',us';
    return rp(options);
}

function getForecastByCoordinates(lat, lon) {
    var options = getDefaultOptions();
    options.qs.lat = lat;
    options.qs.lon = lon;
    return rp(options);
}
