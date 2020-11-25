const router = require('express').Router()

router.post('/login', (req, res) =>{
    return res.status(200).send(['Login',req.body])
})

router.get('/register', (req, res) =>{
    return res.send("Register screen work")
})

module.exports = router