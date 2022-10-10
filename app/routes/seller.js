const auctionController = require('../controllers/auctionController')
const productController = require('../controllers/productController')
const router = require('express').Router()

router.get('/products', productController.readAllProdSeller) //
router.post('/products', productController.add) //
router.put('/products/:id', productController.edit) //
router.delete('/products/:id', productController.delete) //
router.post('/auctions', auctionController.sellerAddAuction)

module.exports = router

