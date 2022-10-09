const cartController = require('../controllers/cartController')
const productController = require('../controllers/productController')

const router = require('express').Router()

router.get('/products', productController.readAll)
router.get('/products/:id', productController.readById)
router.get('/carts', cartController.readCarts)
router.post('/carts', cartController.add)
router.delete('/carts/:id', cartController.delete)
router.patch('/carts/:id', cartController.editAmount)
router.put('/carts/:id', cartController.edit)

module.exports = router
