const auctionController = require('../controllers/auctionController')
const router = require('express').Router()

router.get('/auctions', auctionController.adminReadAuction)
router.patch('/auctions/:id', auctionController.adminUpdate)
router.put('/auctions/:id', auctionController.updateFinalBid)

module.exports = router
