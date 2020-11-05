const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca97ff651e91cecb6209d8f67790b465&query=' + latitude + ',' + longitude + '&units=m'
    request(url, { json: true }, (error, { body } = {}) => {

        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        }
        else {
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const weatherType = body.current.weather_descriptions[0];
            const data = {
                temperature,
                feelsLike,
                weatherType
            }
            callback(undefined, data);
        }

    })
}

module.exports = forecast;


