const router = require('express').Router()
const {index, create, messages, deleteChat, imageUpload, addUserToGroup, leaveCurrentChat} = require('../controllers/chatController')
const {auth} = require('../middleware/auth')
const {chatFile} = require('../middleware/fileUpload')

router.get('/', [auth], index)
router.post('/create', [auth], create)
router.post('/upload-image', [auth, chatFile], imageUpload)
router.get('/messages', [auth], messages)
router.post('/add-user-to-group', auth, addUserToGroup)
router.post('/leave-current-chat', auth, leaveCurrentChat)
router.delete('/:id', [auth], deleteChat)

module.exports = router