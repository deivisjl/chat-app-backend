const router = require('express').Router()
const {login, register} = require('../controllers/authController')

router.post('/login', login)

router.get('/register', register)

module.exports = router