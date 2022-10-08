const {Product, Location, SubCategory, Category, User} = require('../models');

class productController {
    static async readAll(req, res, next){
        try {
            const data = await Product.findAll({
                include: [Location, SubCategory]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async readById(req, res, next){
        try {
            const {id} = req.params
            const data = await Product.findByPk(id,{
                include: [
                    {
                        model: User,
                        attributes: ['fName', 'lName', 'email']
                    }, 
                    Location, 
                    {
                        model: SubCategory,
                        include: Category
                    }
                ]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async add(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }
    static async edit(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }
    static async delete(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = productController