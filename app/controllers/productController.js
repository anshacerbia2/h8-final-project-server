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
            const addedProduct = await Product.create({
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

            const addLocation = await Location.create({
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
                listImages
            } = req.body
            const {id} = req.params
            Product.Update()

            const updated = await Product.update({
                name, 
                description, 
                price, 
                mainImg, 
                harvestDate, 
                unit,
                stock,
                SubCategoryId
            },
            {
                where: {
                    id
                }
            }, {
                transaction: t
            })

            const readOldImage = await Image.findAll({
                where: {
                    id
                }
            },{
                transaction: t
            })

            const oldImageId = readOldImage.map(el => el.id)

            const deleteOldImg = await Image.destroy({
                where: {
                    id: oldImageId
                }
            }, {
                transaction: t
            })

            listImages.forEach(el => el.ProductId = id);

            const newImages = await Image.bulkCreate(listImages, {
                transaction: t
            })

            await t.commit()
            res.status(200).json({
                msg: `Updated Product with id ${id}`
            })
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }
    static async delete(req, res, next){
        try {
            const {id} = req.params
            await Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                msg: `Product deleted succesfully`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = productController