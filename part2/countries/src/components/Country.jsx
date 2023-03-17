import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather';

const Country = ({ displayCountry }) => {
  if (displayCountry === null) { return null; }

  const [weather, setWeather] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${displayCountry.latlng[0]}&lon=${displayCountry.latlng[1]}&appid=${apiKey}`)
      .then((result) => setWeather(result.data))
  }, [])


  return (
    <div>
      <h1>{displayCountry.name.common}</h1>
      <p>capital {displayCountry.capital[0]}</p>
      <p>area {displayCountry.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(displayCountry.languages).map(lang => <li>{lang}</li>)}
      </ul>
      <img src={displayCountry.flags.png} />
      <Weather weather={weather} capital={displayCountry.capital[0]} />
    </div>
  )
}

export default Country