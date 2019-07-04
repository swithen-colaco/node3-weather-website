const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4a44877967f60a795a10c9188fe7c76f/' + longitude + ',' + latitude;

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to API server', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'The current temp is ' + body.currently.temperature + '. Chance of rain ' + body.currently.precipProbability + '. ' + body.currently.summary);
        }
    });
};

module.exports = forecast;