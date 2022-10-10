const {Cart, Product} = require('../models');

class cartController {
    static async readCarts(req, res, next){ //nanti kayaknya ada amount
        try {
            const {id: UserId} = req.user
            const data = await Cart.findAll({
                where: {
                    UserId
                },
                include: Product
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async add(req, res, next){
        try {
            const {id: UserId} = req.user
            // const { ProductId } = req.body
            const { id: ProductId } = req.params
            const data = await Cart.create({
                UserId,
                ProductId,
                quantity: 1
            })
            res.status(201).json({
                msg: `Success Add Product to Cart`
            })
        } catch (err) {
            next(err)
        }
    }
    static async delete(req, res, next){
        try {
            const {id} = req.params
            await Cart.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: `Cart with id ${id} success deleted`
            })
        } catch (err) {
            next(err)
        }
    }

    static async editAmountInc(req, res, next){
        try {
            const {id} = req.params
            await Cart.increment('quantity', {by: 1}, {
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: `Edited Amount`
            })
        } catch (err) {
            next(err)
        }
    }

    static async editAmountDec(req, res, next){
        try {
            const {id} = req.params
            await Cart.decrement('quantity', {by: 1}, {
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: `Edited Amount`
            })
        } catch (err) {
            next(err)
        }
    }
    static async edit(req, res, next){
        try {
            const {id} = req.params
            // const {ProductId, amount} = req.body
            await Cart.update({
                ...req.body
            })
            res.status(200).json({
                msg: `Edited Cart`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = cartController