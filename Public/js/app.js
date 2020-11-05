console.log('Client side js loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const statusMessage = document.querySelector('#status')
const dataMessage = document.querySelector('#data')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    statusMessage.textContent = 'Loading'
    dataMessage.textContent = ''
    const location = search.value
    fetch('/weather?location='+ location).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                if (data.error) {
                    statusMessage.textContent = 'Error'
                    dataMessage.textContent = data.error
                } else {
                    const {latitude, longitude, location, temperature, feelsLike, weatherType, windSpeed} = data
                    statusMessage.textContent = 'Success'
                    dataMessage.textContent = 'It is ' + weatherType + ' in ' + location + ' (' + latitude + ', ' + longitude + '), the temperature is ' + temperature + '°C (feels like '+ feelsLike + '°C). Wind speed is ' + windSpeed + 'm/s.'
                    console.log(data)
                }
            })
        } else {
            statusMessage.textContent = 'Error'
            dataMessage.textContent = response.statusText
        }
    })
    
})
