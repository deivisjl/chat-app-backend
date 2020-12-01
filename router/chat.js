const router = require('express').Router()
const {index, create, messages} = require('../controllers/chatController')
const {auth} = require('../middleware/auth')

router.get('/', [auth], index)
router.post('/create', [auth], create)
router.get('/messages', [auth], messages)

module.exports = router