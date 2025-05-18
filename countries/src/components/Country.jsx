import lookup from "../services/lookup"
import { useEffect, useState } from 'react'

const Languages = ({languages}) => {
    return (
        Object.values(languages).map(language =>
            <li key={language}>{language}</li>
        )
    )
}

const Country = ({ displayedCountries }) => {
    const [countryData, setCountryData] = useState(null);

    useEffect(() => {
        if (displayedCountries.length === 1) {
            lookup.getCountry(displayedCountries[0])
                .then(data => {
                    setCountryData(data);
                });
        }
    }, [displayedCountries]);

    if (displayedCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (displayedCountries.length > 1) {
        return (
            displayedCountries.map(country =>
                <p key={country}>
                    {country}
                    <button>Show</button>
                </p>
            )
        );
    } else if (displayedCountries.length === 1 && countryData) {
        // console.log(countryData)
        return (
            <div>
                <h2>{countryData.name.common}</h2>
                <p>Capital {countryData.capital[0]}</p>
                <p>Area: {countryData.area}</p>
                <h3>Languages</h3>
                <ul><Languages languages={countryData.languages}/></ul>
                <img src={countryData.flags.png} alt={countryData.flags.alt}/>
            </div>
        );
    }

    return <></>;
};

export default Country;
