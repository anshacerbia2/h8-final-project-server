const router = require('express').Router()
const chatRouter = require("./chat")

router.use('/', chatRouter)

module.exports = router
