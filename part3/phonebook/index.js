const express = require('express')
const app = express()
require('dotenv').config()

const port =  process.env.PORT || 3000
const dummyData = [
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

app.get('/info',(req,res)=>{
    res.send(`
    <p>Phonebook has infor for ${dummyData.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (req, res) => {
  res.json({dummyData})
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id;
    const filteredPerson = dummyData.filter(d=>d.id==id);
    if(filteredPerson.length!=0){
        return res.send(`<p>name: ${filteredPerson[0].name}</p>
            <p>number : ${filteredPerson[0].number} </p>`)
    }
    else{
        return res.status(404);
    }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})