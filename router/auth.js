const router = require('express').Router()

router.get('/login', (req, res) =>{
    return res.send("Login screen work")
})

router.get('/register', (req, res) =>{
    return res.send("Register screen work")
})

module.exports = router