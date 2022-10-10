const auctionController = require('../controllers/auctionController')
const router = require('express').Router()

router.get('/auctions', auctionController.adminReadAuction)
router.patch('/auctions/:id', auctionController.adminUpdate)

module.exports = router
