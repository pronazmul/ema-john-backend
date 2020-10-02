const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json())
app.use(cors())

require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mx72a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db(process.env.DB_NAME).collection(process.env.COLLECTION);

    // Insert Data To mongo
    app.post('/addProduct', (req, res) => {
        collection.insertMany(req.body)
            .then(result => console.log(result))
    })

    // Load all Data From Backend
    app.get('/product',(req,res)=>{
        collection.find({})
        .toArray((err,document)=>{
            res.send(document)
        })
    })





})



app.get('/', (req, res) => res.send("Welcome Software developer"))
app.listen(port)
