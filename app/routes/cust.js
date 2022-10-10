const auctionController = require('../controllers/auctionController')
const cartController = require('../controllers/cartController')
const productController = require('../controllers/productController')
const { AuthorizationCust, Auth } = require('../middlewares')

const router = require('express').Router()

router.get('/products', productController.readAll) //
router.get('/products/:id', productController.readById) //

router.use(Auth) //
router.use(AuthorizationCust) //

router.get('/carts', cartController.readCarts) //
router.patch('/carts/inc/:id', cartController.editAmountInc) 
router.patch('/carts/dec/:id', cartController.editAmountDec) 
router.post('/carts/:id', cartController.add) //
router.delete('/carts/:id', cartController.delete) //
router.put('/carts/:id', cartController.edit)
router.get('/auctions', auctionController.custReadAuction)
router.get('/userauctions', auctionController.readAuctionByCustId)
router.get('/auctions/:id', auctionController.readAuctionById)

module.exports = router
