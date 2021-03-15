const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const dns = document.querySelector('#dns')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
alert.style.display = 'block'

form.addEventListener('submit', e => {
    e.preventDefault()
    const city = input.value
    const hostname = dns.value
    if(city) {
        getWeatherData(city)
    } if(hostname) {
        getAddress(hostname)
    }
})

async function getWeatherData(city) {
    alert.style.display = 'none'
    try {
     const {data} = await axios.post('/api/weather',{city}) 
        const {name} = data
        const {country,sunrise} = data.sys
        const {temp_max:max,temp_min:min,feels_like} = data.main
        const {description} = data.weather[0]
        result.innerHTML = `
            <article class="card">
            <h3>${name},${country},${new Date(sunrise).toLocaleTimeString()}</h3>
            <p>${description}</p>
            <p>min temp: ${min}&#8457</p>
            <p>max temp: ${max}&#8457</p>
            <p>feels like: ${feels_like}&#8457</p>`
            input.value = ''
    } catch (error) {
        alert.style.display='block'
        alert.textContent = `Something wrong with the city: ${city}`
    }
}
async function getAddress(hostname) {
    alert.style.display = 'block'
    try {
     const {data} = await axios.post('/api/dns',{hostname}) 
        result.innerHTML = `The ip address for <mark>${hostname.toUpperCase()}</mark> is: <strong>${data}</strong>`
        dns.value = ''
    } catch (error) {
        alert.style.display='block'
        alert.textContent = `Something wrong with the hostname: ${hostname}`
    }
}
