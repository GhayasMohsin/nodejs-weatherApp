console.log('The live server is setup');

// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json().then((data) => {
//             console.log(data)
//         })
//     })




let fetchhhh = (location, callback) => {

    fetch('/weather?address=' + location)
    // fetch('/weather?address=' + location)
        .then(
            (response) => {
                response.json().then((data) => {
                    if (data.error) {
                        return callback('Kindly give location to see', undefined)
                    } else {
                        return callback(undefined, data)
                    }
                })
            })
}


const weatherForm = document.querySelector('form')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')
const loadingmessage = document.getElementById('loading')

message1.style.display = 'none'
message2.style.display = 'none'

weatherForm.addEventListener('submit', (e) => {
    let location = document.querySelector('input')
    e.preventDefault()
    const search = location.value
    console.log(search)
    loadingmessage.style.display='block'
    loadingmessage.textContent = 'Loading.........'
    fetchhhh(search, ((error, response) => {

        if (error === undefined) {
            message1.style.display = 'block'
            message1.textContent = response.location.name + " Forecast " + response.current.weather_descriptions[0] + " Temperature is " + response.current.temperature
            message2.textContent = ''
            message2.style.display = 'none'
            loadingmessage.style.display = 'none'
        } else {
            // message1.textContent = 'not responding'
            loadingmessage.style.display = 'none'
            message1.style.display = 'none'
            message2.style.display = 'block'
            message2.textContent = error
        }
    }))
})





