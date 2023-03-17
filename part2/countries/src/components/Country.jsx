import React from 'react'

const Country = ({displayCountry}) => {
  if(displayCountry===null){return null;}
  return (
    <div>
      <h1>{displayCountry.name.common}</h1>
      <p>capital {displayCountry.capital[0]}</p>
      <p>area {displayCountry.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(displayCountry.languages).map(lang=><li>{lang}</li>)}
      </ul>
      <img src={displayCountry.flags[1]} />
    </div>
  )
}

export default Country