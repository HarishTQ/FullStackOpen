import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries.jsx'
import Filter from './components/Filter.jsx'



const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const handleFilterChange = (e) => {setFilter(e.target.value)}

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((result) => setCountries(result.data))
  },[])

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />
      <DisplayCountries countries={filteredCountries} />
    </div>
  )
}

export default App