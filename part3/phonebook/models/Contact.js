const mongoose = require('mongoose')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'

const contactSchema = new mongoose.Schema({
    name:{
		type:String,
		minLength:3,
		required:true
	},
    number:Number
})

contactSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


mongoose.connect(url)
	.then(result => {
		console.log('connected to MongoDB')
	}).catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

module.exports = mongoose.model('contact',contactSchema);