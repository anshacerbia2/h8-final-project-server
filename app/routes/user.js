const userController = require('../controllers/userController')
const router = require('express').Router()

router.post('/regisCust', userController.handleRegisterCust)
router.post('/regisAdmin', userController.handleRegisterAdmin)
router.post('/regisSeller', userController.handleRegisterSeller)
router.post('/login', userController.login)

module.exports = router
