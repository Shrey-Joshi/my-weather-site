const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/612c64eda24b2db7daf2353d4b2fcca5/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. \n\nWe expect there to be: '+body.daily.summary+"\n\n The expected temperature high will be "+body.daily.data[0].temperatureHigh+" and the expected temperature low will be "+body.daily.data[0].temperatureLow+".\n\nHumidity will be "+(100*body.daily.data[0].humidity)+" and the UV index will be "+body.daily.data[0].uvIndex+".")
        }
    })
}

module.exports = forecast