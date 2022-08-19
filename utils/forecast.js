const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9e82eb7a30a199dd19da8adf9d5c9d68&query=' + lat + ',' + long
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('No internet Connection', undefined)
        } else if (response.body.error) {
            callback('No location Found', undefined)
        }
        else {
            callback(undefined, `temperature is ${response.body.current.temperature}. But it feels like ${response.body.current.feelslike}`)
        }
    })
}

module.exports = forecast