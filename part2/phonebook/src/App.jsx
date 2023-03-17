import {useState} from 'react'

const App = () => {
  const [persons,setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Thotakura Harish' }
  ]) 
  const [newName,setNewName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const filterdPerson = persons.filter((person)=>person.name===newName);
    if(filterdPerson.length===0){
      console.log(filterdPerson)
      setPersons(persons.concat({name:newName}))  
    }else{
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleInputChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <p>name: <input value={newName} onChange={handleInputChange}/></p>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=><p>{person.name}</p>)}
    </div>
  )
}

export default App