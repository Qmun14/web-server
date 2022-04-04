console.log(`Client side has on load!`);

const formWeather = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Location'
message2.textContent = 'Current Weather'

formWeather.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading ...'
    message2.textContent = ''

    const location = search.value;

    fetch(`/weather?address=${location.toString()}`).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                return message1.textContent = data.err;
            } else {
                message1.textContent = data.location;
                message2.textContent =  data.forecast;
            }
        })
    })


})