const Languages = ({ languages }) => (
  Object.values(languages).map(language => <li key={language}>{language}</li>)
);

const Country = ({ displayedCountries, countryData, onShowCountry, weatherData }) => {
  if (displayedCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (displayedCountries.length > 1) {
    return (
      displayedCountries.map(country =>
        <p key={country}>
          {country}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </p>
      )
    );
  } else if (displayedCountries.length === 1 && countryData && weatherData) {
    return (
      <div>
        <h2>{countryData.name.common}</h2>
        <p>Capital {countryData.capital[0]}</p>
        <p>Area: {countryData.area}</p>
        <h3>Languages</h3>
        <ul><Languages languages={countryData.languages} /></ul>
        <img src={countryData.flags.png} alt={countryData.flags.alt} />
        <h3>Weather in {countryData.capital}</h3>
        <p>Temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
        <p>Wind {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
  return <></>;
};

export default Country;
