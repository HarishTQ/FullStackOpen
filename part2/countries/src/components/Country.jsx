import React from 'react'

const Country = ({country}) => {
  if(country=={}){return null;}
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(country.languages).map(lang=><li>{lang}</li>)}
      </ul>
      <img src={country.flags[1]} />
    </div>
  )
}

export default Country