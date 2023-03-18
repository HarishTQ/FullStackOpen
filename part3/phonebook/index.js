const express = require('express')
const app = express()
require('dotenv').config()

const port =  process.env.PORT || 3000
let dummyData = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/info',(req,res)=>{
    res.send(`
    <p>Phonebook has infor for ${dummyData.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (req, res) => {
  res.json({dummyData})
})

app.post('/api/persons',(req,res)=>{
    const body = req.body;
    const newPerson = {
        id:Math.floor(Math.random()*10000),
        name:body.name,
        number:body.number
    }
    dummyData.push(newPerson)
    res.json(newPerson).status(202)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id;
    const person = dummyData.find(person => person.id == id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id;
    dummyData = dummyData.filter(data => data.id!=id)
    res.status(204).end()
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})