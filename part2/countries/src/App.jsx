import {useState,useEffect} from 'react'
import data from '../data.js'
import DisplayCountries from './components/DisplayCountries.jsx'
import Filter from './components/Filter.jsx'

const App = () => {
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState('')
  const filteredCountries = countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()))
  useEffect(()=>{setCountries(data)},[])

  const handleFilterChange = (e) =>{
    setFilter(e.target.value)
  }

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />
      <DisplayCountries countries={filteredCountries}/>
    </div>
  )
}

export default App