import React from 'react'

const Persons = ({persons,filter,handleDelete}) => {
  const contactsToShow = filter === "" ? persons
      :persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
        {contactsToShow.map((person) => <p>{person.name} {person.number} <button onClick={() => { handleDelete(person.id, person.name) }}>delete</button></p>)}
    </div>
  )
}

export default Persons