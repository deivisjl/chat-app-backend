const express = require('express')

const myConfig = require('./config/app')

const router = require('./router')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = myConfig.appPort

app.listen(port, ()=>{
    console.log('Server listening on port 8081')
})
