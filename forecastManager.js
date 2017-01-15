var forecastManager = {
        getForecastByZipCode: getForecastByZipCode,
        getForecastByCity: getForecastByCity
    },
    weatherRepository = require('./weatherRepository.js'),
    postalCodeRepository = require('./postalCodeRepository.js');


module.exports = forecastManager;


function getForecastByZipCode(zip) {
    var promise = new Promise(function(resolve, reject) {
        var coordinatesPromise = postalCodeRepository.getLatLongForZipCode(zip);

        coordinatesPromise
            .then(function(coordinates) {
                var lat = coordinates.postalcodes[0].lat,
                    lon = coordinates.postalcodes[0].lng;

                return weatherRepository.getForecastByCoordinates(lat, lon);

            })
            .then(function(forecast) {
                resolve(forecast);
            })
            .catch(function(err) {
                // API call failed...
                console.log('rest call error ', err);
                reject(err);
            });

    });

    return promise;
}

function getForecastByCity(city) {
    return weatherRepository.getForecastByCity(city);
}
