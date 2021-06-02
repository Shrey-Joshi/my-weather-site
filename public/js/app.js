/**
 * This is the client side script. 
 * This sends the plaintext address to server.
 * This renders the returned location and weather
 *  data.
 */

console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    messageFive.textContent = ""
    messageSix.textContent = ""

    fetch(`/weather?${new URLSearchParams({address: location})}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'There was an error!'
                if(confirm("There was an error! \nWould you like to see the detailed error?")){
                    alert(data.error)
                }
                console.log(data.error)

            } else {
				
                forecastDataOne = data.forecast.daily.data[0].summary

                forecastDataTwo = `It is currently ${(data.forecast.currently.temperature).toPrecision(3)} °F out. There is a ${(data.forecast.currently.precipProbability).toPrecision(1)}% chance of rain.`

                forecastDataThree = `We expect there to be: ${data.forecast.daily.summary}`

                forecastDataFour = `The expected temperature high will be ${(data.forecast.daily.data[0].temperatureHigh).toPrecision(3)} and the expected temperature low will be ${(data.forecast.daily.data[0].temperatureLow).toPrecision(3)}.`

                forecastDataFive = `Humidity will be ${(100*data.forecast.daily.data[0].humidity).toPrecision(3)} and the UV index will be ${data.forecast.daily.data[0].uvIndex}.`

                messageOne.textContent = data.location
                messageTwo.textContent = forecastDataOne
                messageThree.textContent = forecastDataTwo
                messageFour.textContent = forecastDataThree
                messageFive.textContent = forecastDataFour
                messageSix.textContent = forecastDataFive

                console.log(data.location)
                console.log(forecastDataOne)
                console.log(forecastDataTwo)
                console.log(forecastDataThree)
                console.log(forecastDataFour)
                console.log(forecastDataFive)
            }
        })
    })
})