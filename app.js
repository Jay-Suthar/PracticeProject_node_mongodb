const express = require("express");
const path = require("path");
// const fs = require("fs");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactArena', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const port = 8000;

//first in one terminal write mongod to start mongodb server
//in other write mongo 
//the other will be for js



//define mongoose
const contactSchema = new mongoose.Schema({
   name: String,
   dob: String,
   phone: String,
   email: String,
   address: String,
   exp: String,
   desc: String
  });


const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        const params = {'title': 'This Item has been saved to database'};
        res.status(200).render('submit.pug',params);
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database");
    });

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

