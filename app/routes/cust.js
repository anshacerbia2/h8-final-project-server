const productController = require('../controllers/productController')

const router = require('express').Router()

router.get('/products', productController.readAll)
router.get('/products/:id', productController.readById)

module.exports = router
