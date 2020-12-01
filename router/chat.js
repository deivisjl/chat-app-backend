const router = require('express').Router()
const {index} = require('../controllers/chatController')
const {auth} = require('../middleware/auth')

router.get('/', [auth], index)

module.exports = router