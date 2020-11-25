const express = require('express')

const myConfig = require('./config/app')

const router = require('./router')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(router)

const port = myConfig.appPort

app.listen(port, ()=>{
    console.log('Server listening on port 8081')
})
