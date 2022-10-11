const userController = require('../controllers/userController')
const { Auth } = require('../middlewares')
const router = require('express').Router()

router.post('/regisCust', userController.handleRegisterCust) //
router.post('/regisAdmin', userController.handleRegisterAdmin) //
router.post('/regisSeller', userController.handleRegisterSeller) //
router.post('/login', userController.login) //
router.get('/readUser/:id', Auth, userController.readUserById)

module.exports = router
