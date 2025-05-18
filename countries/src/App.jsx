import Lookup from './services/lookup'
import { useEffect, useState } from 'react'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('') 

  useEffect(() => {
      Lookup
        .getCountries()
        .then(countryNames => {
          setCountries(countryNames)
        })
    }, [])

  // console.log(countries)
  // Enablement functions for searching through the country component. 
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const displayedCountries = countries.filter(country =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <p>Find Countries <input onChange={handleSearch}/></p>
      <Country displayedCountries={displayedCountries}/>
    </div>
  )
}

export default App