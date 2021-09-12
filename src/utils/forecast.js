const request = require('request');

const forecast = ( latitude, longitude , callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=316547540560aad8b29efefbd7ee8244&query=' + latitude + ',' + longitude + '&units=f';
    request( { url, json:true }, ( error, { body } ) => {
        if(error) {
            callback('Unable to connect to weatherstack API', undefined);
        } else if(body.error) {
            callback('There goes something wrong with the API', undefined);
        } else {
            callback(undefined, body.current.temperature);
        } 
    } )
}

module.exports = forecast;

