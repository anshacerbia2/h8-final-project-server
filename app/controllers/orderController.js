const axios = require('axios');
const {
    Order, 
    OrderDetail,
    OrderList,
    Cart, 
    Product,
    sequelize
} = require('../models');
class orderController {
    static async add(req, res, next){
        const t = await sequelize.transaction();
        try {
            const {id: UserId} = req.user 
            const carts = await Cart.findAll({
                where: {
                    UserId
                },
                include: Product
            }, {
                transaction: t
            })
            const totalPrice = carts.map(el => el.Products.price * el.quantiy)
            const listProducts = carts.map(el => el.Products)

            // const response = await axios.get() //sini midtrans

            const order = await Order.create({
                //response order.id
                //status pending
            }, {
                transaction: t
            })
            
            const orderDetail = await OrderDetail.create({
                //data
            }, {
                transaction: t
            })

            listProducts.forEach(el => el.OrderDetailId = orderDetail.id)
            const orderList = await OrderList.bulkCreate(listProducts, {
                transaction: t
            })

            //ganti status order

            // update stock productnya

            

        } catch (err) {
            t.rollback()
            next(err)
        }
    }
}

module.exports = orderController