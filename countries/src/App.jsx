import Lookup from './services/lookup'
import { useEffect, useState } from 'react'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [countryData, setCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    Lookup.getCountries().then(countryNames => {
      setCountries(countryNames)
    })
  }, [])

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(search.toLowerCase())
    )
    setDisplayedCountries(filtered)
  }, [countries, search])

  useEffect(() => {
    if (displayedCountries.length === 1) {
      Lookup.getCountry(displayedCountries[0]).then(data => setCountryData(data))
      // 
    } else {
      setCountryData(null)
    }
  }, [displayedCountries])

  useEffect(() => {
    if (countryData) {
      Lookup
        .getWeather(countryData.capitalInfo.latlng)
        .then(data => setWeatherData(data))
    }
    else {
      setWeatherData(null)
    }
  }, [countryData])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleShowCountry = (country) => {
    setDisplayedCountries([country])
  }

  return (
    <div>
      <p>Find Countries <input onChange={handleSearch}/></p>
      <Country
        displayedCountries={displayedCountries}
        countryData={countryData}
        onShowCountry={handleShowCountry}
        weatherData={weatherData}
      />
    </div>
  )
}

export default App