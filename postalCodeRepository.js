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
        json: true
    };

    return rp(options);

}
