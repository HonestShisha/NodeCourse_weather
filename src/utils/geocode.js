const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=3&access_token=pk.eyJ1IjoiaG9uZXN0LXNoaXNoYSIsImEiOiJja2dqaWduMngwMGNzMzFtcGFvem1ub3llIn0.60gk2VjnaDtrrfvREyIjHA';

    request(url, { json: true }, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('unable to find location', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;