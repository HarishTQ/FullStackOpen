// to start mongodb use podman start mongo
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017'

const name = process.argv[2];
const number = process.argv[3];
const contactSchema = new mongoose.Schema({
    name:String,
    number:Number
})
const Contact = mongoose.model('contact',contactSchema);

mongoose
    .connect(url)
    .then(()=>{
        console.log('connected')
        if(process.argv.length==2){
            Contact.find({}).then(result=> {
                console.log('phonebook')
                result.forEach(contact=>{
                    console.log(contact.name,contact.number);
                });
                mongoose.connection.close();
            })
            }
        else if(process.argv.length==4){
            const newContact = new Contact({name,number})
            newContact.save()
            .then((result)=>{
                console.log(result.name,result.number);
                mongoose.connection.close()
            });
           }
    })




