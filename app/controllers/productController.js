const {Product, Location, SubCategory, Category, User, sequelize, Image} = require('../models');

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
                    {
                        model: Location,
                        attributes: ['city', 'cityId', 'provId']
                    }, 
                    {
                        model: SubCategory,
                        include: Category
                    },
                    Image
                ]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async add(req, res, next){
        const t = await sequelize.transaction();
        try {
            const {
                name, 
                description, 
                price, 
                mainImg, 
                harvestDate, 
                unit,
                stock,
                SubCategoryId,
                location,
                listImages
            } = req.body

            const {id: UserId} = req.user
            const addedProduct = await Product.Create({
                name, 
                description, 
                price, 
                mainImg, 
                harvestDate, 
                unit,
                stock,
                SubCategoryId,
                UserId  
            }, {
                transaction: t
            })

            listImages.forEach(el => el.ProductId = addedProduct.id);

            const addedImages = await Image.bulkCreate(listImages, {
                transaction: t
            })

            const addLocation = await Location.Create({
                ...location,
                ProductId: addedProduct.id
            }, {
                transaction: t
            })
            await t.commit()
            res.status(201).json({
                msg: `Added New Product`
            })
        } catch (err) {
            await t.rollback()
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