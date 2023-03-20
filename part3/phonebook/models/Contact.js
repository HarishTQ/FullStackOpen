const mongoose = require('mongoose')

const url = process.env.MONGO_URI || 'mongodb://localhost:27017'

const contactSchema = new mongoose.Schema({
    name:{
		type:String,
		minLength:3,
		required:true
	},
    number:{
		type:String,
		validate:{
			validator:function(v){
				return /^\d{2,3}-\d+$/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required:true,
		minLength:8
	}
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
		console.log('connected to MongoDB',result)
	}).catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

module.exports = mongoose.model('contact',contactSchema);