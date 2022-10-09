const productController = require('../controllers/productController')
const router = require('express').Router()

router.get('/products', productController.readAllProdSeller)
router.post('/products', productController.add)
router.post('/products/:id', productController.edit)
router.delete('/products/:id', productController.delete)

module.exports = router

