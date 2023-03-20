import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import contactService from "./services/contactService";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then((result) => {
      setPersons(result.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const person = {name: newName,number: newNumber};
    const filterdPerson = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if(!Number.isInteger(newNumber)){
      setMessage({type: "error",content: 'Number must not a string',});
      setTimeout(() => {setMessage("");}, 5000);
    }
    
    if (filterdPerson.length === 0){
      contactService
        .create(person)
        .then((result) => {
          setPersons(persons.concat(result.data));
          setFilter("");
          setNewName("");
          setNewNumber("");
          setMessage({type: "success",content: `${result.data.name} was successfully added`,});
          setTimeout(() => {setMessage("")}, 5000)
        })
        .catch((error) => {
          console.log(error)
          setMessage({type: "error",content: error.response.data.message,});
          //setMessage({type: "errror",content: `${filterdPerson[0].name} was already deleted from server`,});
          setTimeout(() => {setMessage("");}, 5000);
        });
    }

    else if(window.confirm(`${newName} is already added to phonebook, do u want to replace number with new one?`)){
        contactService
          .update(filterdPerson[0].id, person)
          .then((result) => {
            setPersons(persons.filter((person) => person.id != filterdPerson[0].id).concat(result.data));
            setFilter("");
            setNewName("");
            setNewNumber("");
            setMessage({type: "success",content: `${result.data.name} was successfully updated`,});
            setTimeout(() => {setMessage("");}, 5000);
          })
          .catch((error) => {
            console.log(error)
            setMessage({type: "error",content: error.response.data.message,});
            setTimeout(() => {setMessage("");}, 5000);
          });
      } 
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      contactService.del(id).then((result) => {
        setPersons(persons.filter((person) => person.id != id));
        console.log(error.response.data.error)
        setMessage({type: "error",content: error.response.data.message});
        setTimeout(() => {setMessage("");}, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form
        onSubmit={onSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
