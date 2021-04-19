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
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast[0]
                messageThree.textContent = data.forecast[1]
                messageFour.textContent = data.forecast[2]
                messageFive.textContent = data.forecast[3]
                messageSix.textContent = data.forecast[4]
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})