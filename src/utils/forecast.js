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
            callback(undefined, [
                body.daily.data[0].summary, 
                " It is currently " + (body.currently.temperature).toPrecision(3) + 
                " degrees out. There is a " + (body.currently.precipProbability).toPrecision(1) + 
                "% chance of rain. ", 
                "We expect there to be: " + body.daily.summary, 

                "The expected temperature high will be " + 
                (body.daily.data[0].temperatureHigh).toPrecision(3) + 

                " and the expected temperature low will be " + 
                (body.daily.data[0].temperatureLow).toPrecision(3) + 

                ".", 
                "Humidity will be " + (100*body.daily.data[0].humidity).toPrecision(3) + 
                " and the UV index will be " + body.daily.data[0].uvIndex + 
                "."
            ])
        }
    })
}

module.exports = forecast