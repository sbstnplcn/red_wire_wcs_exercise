let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/red-wire')

let app = express() // create app
let userModel = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String
    }
}))

let users = []
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

let server = app.listen(3000, function() {})

app.get('/users', (req, res, next) => {
    userModel.find({}).exec((err, users) => {
        res.json(users)
    })
})

app.get('/users/:id', function(req, res) {
    res.json(users[req.body.id])
})

app.post('/users/', function(req, res) {
    userModel.create(req.body, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201)
        }
    })
})

app.put('/users/:id', function(req, res) {
    userModel.update({
        _id: rq.params.id
    }).exec((err, users) => {
        res.sendStatus(200)
    })
})

app.delete('/users/:id', function(req, res) {
    userModel.findByIdAndRemove(req.params.id, (err, user) => {
        users.splice(req.params.id, 1)
    }).exec((err, user) => {
        res.sendStatus(200)
    })
})
