const cartController = require('../controllers/cartController')
const productController = require('../controllers/productController')
const { AuthorizationCust, Auth } = require('../middlewares')

const router = require('express').Router()

router.get('/products', productController.readAll) //
router.get('/products/:id', productController.readById) //

router.use(Auth) //
router.use(AuthorizationCust) //

router.get('/carts', cartController.readCarts) //
router.post('/carts/:id', cartController.add) //
router.delete('/carts/:id', cartController.delete) //
router.patch('/carts/:id', cartController.editAmount) 
router.put('/carts/:id', cartController.edit)

module.exports = router
