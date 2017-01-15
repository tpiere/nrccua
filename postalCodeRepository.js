var postalCodeRepository = {
    getLatLongForZipCode: getLatLongForZipCode
};

module.exports = postalCodeRepository;

var rp = require('request-promise');


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
