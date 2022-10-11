const chatController = require('../controllers/chatController')
const router = require('express').Router()

router.get("/rooms/:currentId", chatController.getRooms)
router.get("/room/:currentId/:targetId", chatController.getOneRoom)
router.get("/chats/:roomId", chatController.getChatHistory)

module.exports = router
