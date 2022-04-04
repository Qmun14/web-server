const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=dff315052259f913ed5b1ecd41b70775&query=${encodeURIComponent(latitude.toString())},${encodeURIComponent(longitude.toString())}&units=m`

    request({url, json : true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location, please select another cordinate', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
                `. it's currently ` + body.current.temperature + ` degrees celcius out. There's a ` + 
                 body.current.precip + `% chance to rain/dry`
             )}
    })

}   

module.exports = forecast