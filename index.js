const express = require('express')

const app = express()

const port = 8081

app.listen(port, ()=>{
    console.log('Server listening on port 8081')
})

console.log("Hello World")