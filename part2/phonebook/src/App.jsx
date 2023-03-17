import {useState,useEffect} from 'react'
import contactService from './contactService';
// TODO ex2.10 refractor pending

const App = () => {
  const [persons,setPersons] = useState([]);
  const [newName,setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('');
  const [filter,setFilter] = useState('')

  useEffect(()=>{
    contactService
      .getAll()
      .then((result) => {
      setPersons(result.data)
    })
  },[])

  const contactsToShow = filter === '' ? persons : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const onSubmit = (event) => {
    event.preventDefault();
    const person = {
      name:newName,
      number:newNumber
    }
    const filterdPerson = persons.filter((person)=>person.name===newName);
    if(filterdPerson.length===0){
      contactService
        .create(person)
        .then((result)=>{
          setPersons(persons.concat(result.data))
          setFilter('')
          setNewName('')
          setNewNumber('')
      })

    }else{
      if(window.confirm(`${newName} is already added to phonebook, do u want to replace number with new one?`)){
        contactService
          .update(filterdPerson[0].id,person)
          .then((result)=>{
            setPersons(persons.filter(person=>person.id!=filterdPerson[0].id).concat(result.data))
            setFilter('')
            setNewName('')
            setNewNumber('')
          })
      }
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

  const handleDelete = (id,name) =>{
    if(window.confirm(`Delete ${name}`)){
      contactService.del(id)
      .then((result)=>{
        setPersons(persons.filter(person=>person.id!=id));
      })
    }
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
      {contactsToShow.map((person)=><p>{person.name} {person.number} <button onClick={()=>{handleDelete(person.id,person.name)}}>delete</button></p>)}
    </div>
  )
}

export default App