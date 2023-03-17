import React,{useState}from 'react'

const Filter = ({filter,setFilter}) => {
  return <p><input value={filter} onChange={setFilter}/></p>
}

export default Filter