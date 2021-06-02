const request = require('request')

const forecast = (latitude, longitude, callback) => {
	/**
	 * This is the function that gets the forecasted
	 *  data, given a location.
	 * Inputs are numbers latitude and longitude.
	 * Outputs either an error or a formatted 
	 *  array with the string data requested split
	 *  into lines. It is ready to be displayed.
	 */

    const url = 'https://api.darksky.net/forecast/612c64eda24b2db7daf2353d4b2fcca5/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast