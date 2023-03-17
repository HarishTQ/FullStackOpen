import {useState,useEffect} from 'react'
import axios from 'axios'
// TODO ex2.10 refractor pending

const App = () => {
  const [persons,setPersons] = useState([]);
  const [newName,setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('');
  const [filter,setFilter] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then((result) => {
      setPersons(result.data)
    })
  },[])

  const contactsToShow = filter === '' ? persons : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const onSubmit = (event) => {
    event.preventDefault();
    const filterdPerson = persons.filter((person)=>person.name===newName);
    if(filterdPerson.length===0){
      console.log(filterdPerson)
      setPersons(persons.concat({name:newName,number:newNumber}))
      setFilter('')  
    }else{
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={onSubmit}>
      <p>name: <input value={newName} onChange={handleNameChange}/></p>
      <p>name: <input value={newNumber} onChange={handleNumberChange}/></p>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {contactsToShow.map((person)=><p>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App