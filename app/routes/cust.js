const productController = require('../controllers/productController')

const router = require('express').Router()

router.get('/products', productController.readAll)
router.get('/products/:id', productController.readById)
router.post('/products', productController.add)
router.post('/products/:id', productController.edit)


module.exports = router
