const {AuctionProduct, User} = require('../models');

class auctionController {
    static async sellerAddAuction(req, res, next){
        try {
            const {id: SellerId} = req.user
            await AuctionProduct.create({
                ...req.body,
                SellerId
            })
            res.status(201).json({
                msg: `Product has been created, please wait for admin to response`
            })
        } catch (err) {
            next(err)
        }
    }
    static async adminReadAuction(req, res, next){
        try {
            const data = await AuctionProduct.findAll({
                include: [
                    {
                        model: User,
                        as: 'Seller'
                    },
                    {
                        model: User,
                        as: 'Cust'
                    }
                ]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async adminUpdate(req, res, next){
        try {
            const {id} = req.params
            await AuctionProduct.update({
                ...req.body //status dan AuctionDate
            }, {
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: `Updated Status`
            })
        } catch (err) {
            next(err)
        }
    }
    static async custReadAuction(req, res, next){
        try {
            const data = await AuctionProduct.findAll({
                where: {
                    status: `Approved`
                },
                include: {
                    model: User,
                    as: 'Seller'
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async readAuctionById(req, res, next){
        try {
            const {id} = req.params
            const data = await AuctionProduct.findByPk(id, {
                include: {
                    model: User,
                    as: 'Seller'
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async readAuctionByCustId(req, res, next){
        try {
            const {id: CustId} = req.user
            const data = await AuctionProduct.findAll({
                where: {
                    CustId
                },
                include: {
                    model: User,
                    as: 'Seller'
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async updateFinalBid(req, res, next){
        try {
            await AuctionProduct.update({
                ...req.body //lastBidPrice dan CustId
            }, {
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: `Auction Done`
            })
        } catch (err) {
            next(err)
        }
    }
    static async payAuction(req, res, next){
        try {
            //midtrans terus update status pembayaran
        } catch (err) {
            next(err)
        }
    }
}

module.exports = auctionController