import React from 'react'

const Weather = ({ weather, capital }) => {
    if (weather.length == 0) { return null; }
    //
    //
    //
    console.log(weather)
    return (
        <div>
            <h1>Weather in {capital}</h1>
            <p>temperature {weather.main.temp - 273} C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>wind {weather.wind.speed}m/s </p>
        </div>
    )
}

export default Weather