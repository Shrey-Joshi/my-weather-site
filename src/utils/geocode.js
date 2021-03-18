const request = require('request')

const geocode = (address, callback) => {

	console.log('geocode started')
	// Ensure the address is proper:
	// Properly encoding:
	address = encodeURIComponent(address)

	// Lack of semicolons:
	// If any then remove them
	address = address.replaceAll("%3B", "")

	// Only UTF-8 chars

	// <= 20 words:
	if (address.split("+").length > 20){
		// If so then remove the rest of the words
		address = ((address.split("+")).slice(0, 20)).join("+")
	} 

	// <= 256 characters
	if (address.length > 256) {
		address = address.slice(0, 256)
	}

	// If there are no characters left in string:
	if (address.length === 0) {
		callback('Invalid input.', undefined)
	}

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHJpY2t5LWN1dGxlcnktNyIsImEiOiJjazR1YjV4Zjgzbm5tM2tuc2VjemRxa3I5In0.pJit0UFF58qsn--5BoSe0w&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features === undefined) {
            callback('Oh no! Either the mapbox service is down or we have run out of free uses of their service! My apologies!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode