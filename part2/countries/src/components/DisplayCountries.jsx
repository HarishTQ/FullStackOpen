import React,{useState} from 'react'
import Country from './Country'

const DisplayCountries = ({ countries }) => {
    const [country, setCoutry] = useState()
    if (countries.length > 10) { return <p>Too many matches,specify another filter</p> }
    else if (countries.length > 1 && countries.length < 11) {
        return <>{countries.map(country => <p>{country.name.common}</p>)}</>
    }
    else if (countries.length == 1) {
        return <Country country={countries[0]} />
    }
    else { return <p>No Matches</p> }
}

export default DisplayCountries