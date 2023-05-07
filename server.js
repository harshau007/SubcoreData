const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')
var port = process.env.PORT || 4000;
require('dotenv').config();
app.listen(port, '0.0.0.0');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))

mongoose.
    connect(process.env.DataBaseURI, { useNewUrlParser: true}, { useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(5500, () => {
            console.log("App running on http://localhost:4000")
        })
    }).catch((error) => {
        console.log(error)
    })

const memberSchema = {
    name: String,
    designation: String,
    branch: String,
    image: String,
    linkedin:String
}

const members = mongoose.model("subcoremembers", memberSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    let member = new members({
        name: req.body.name,
        designation: req.body.designation,
        branch: req.body.branch,
        image: req.body.image,
        linkedin: req.body.linkedin
    })
    member.save();
    res.redirect('/');
})