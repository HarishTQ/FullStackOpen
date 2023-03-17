import React from 'react'

const Persons = ({contactsToShow,handleDelete}) => {
  return (
    <div>
        {contactsToShow.map((person) => <p>{person.name} {person.number} <button onClick={() => { handleDelete(person.id, person.name) }}>delete</button></p>)}
    </div>
  )
}

export default Persons