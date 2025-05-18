import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const apiKey = import.meta.env.VITE_OPENWEATHER; 
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'

const getCountries = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request
        .then(response => response.data.map(country => country.name.common)
        );
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`);
    return request.then(response => response.data);
}

const getWeather = (latlng) => {
    // console.log(`${weatherURL}lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`)
    const request = axios.get(`${weatherURL}lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`)
    return request.then(response => response.data);
}

export default { getCountries, getCountry, getWeather }