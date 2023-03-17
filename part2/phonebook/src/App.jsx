import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";

import contactService from "./contactService";
// TODO ex2.10 refractor pending

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    contactService.getAll().then((result) => {
      setPersons(result.data);
    });
  }, []);

  const contactsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const onSubmit = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    const filterdPerson = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (filterdPerson.length === 0) {
      contactService
        .create(person)
        .then((result) => {
          setPersons(persons.concat(result.data));
          setFilter("");
          setNewName("");
          setNewNumber("");
          setMessage({
            type: "success",
            content: `${result.data.name} was successfully added`,
          });
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            type: "errror",
            content: `${filterdPerson[0].name} was already deleted from server`,
          });
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do u want to replace number with new one?`
        )
      ) {
        contactService
          .update(filterdPerson[0].id, person)
          .then((result) => {
            setPersons(
              persons
                .filter((person) => person.id != filterdPerson[0].id)
                .concat(result.data)
            );
            setFilter("");
            setNewName("");
            setNewNumber("");
            setMessage({
              type: "success",
              content: `${result.data.name} was successfully updated`,
            });
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              type: "errror",
              content: `${filterdPerson[0].name} was already deleted from server`,
            });
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
      }
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      contactService.del(id).then((result) => {
        setPersons(persons.filter((person) => person.id != id));
        setMessage({
          type: "success",
          content: `${name} was successfully added`,
        });
        setTimeout(() => {
          setMessage("");
        }, 5000);
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
      <Persons contactsToShow={contactsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
