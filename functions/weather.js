require('dotenv').config()
const axios = require('axios')
const url= `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`

exports.handler = async  (event, context) => {
    const method = event.httpMethod
    if(method !== 'POST') {
    return {
        headers: {"Content-Type": "text/plain",
        'Access-Control-Allow-Origin': '*'},
        statusCode:405,
        body: 'Only POST request allowed!'
        }
    }
    const {city} = JSON.parse(event.body)
    try {
        const resp = await axios.get(`${url}${city}`)
        return {
            headers: {"Content-Type": "text/plain",
            'Access-Control-Allow-Origin': '*'},
            statusCode:200,
            body: JSON.stringify(resp.data)
            }
    } catch (error) {
        return {
            headers: {"Content-Type": "text/plain",
            'Access-Control-Allow-Origin': '*'},
            statusCode:404,
            body: JSON.stringify(error.data)
            }
    }
}