const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/Contact')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3001
let Phonebook = [
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
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
  }

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(morgan((tokens,req,res)=>{
    return[
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res,'content-length'),
        '-',
        tokens['response-time'](req,res),
        'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))
app.use(express.static('dist'))

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has infor for ${Phonebook.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res,next) => {
    Contact.find({}).then((result)=>{
        res.json(result)
    })
    .catch(error=>next(error))
})

app.post('/api/persons', (req, res,next) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number absent' })
    }
    else if (Phonebook.find(entrie => entrie.name === body.name)) {
        return res.status(400).json({error: 'Name must be unique'})
    }
    const newContact = new Contact({
        name: body.name,
        number: body.number
    })
    newContact.save().then((result)=>{
        res.json(result).status(202)
    })
    .catch(error=>next(error))
    
})

app.put('/api/persons/:id',(req,res,next)=>{
    const body = req.body;
    const contact = {name:body.name,number:body.number}

    Contact.findByIdAndUpdate(req.params.id,contact,{new:true})
            .then((response)=>{res.json(response)})
            .catch(error=>next(error))
})

app.get('/api/persons/:id', (req, res,nexy) => {
    const id = req.params.id;
    Contact.findById(req.params.id)
        .then((result)=>{
            res.json(result)
        })
        .catch(error=>next(error))
})

app.delete('/api/persons/:id', (req, res,next) => {
    const id = req.params.id;
    Contact.findByIdAndRemove(id)
        .then((result)=>{
            res.status(204).end()
        })
        .catch(error=>next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})