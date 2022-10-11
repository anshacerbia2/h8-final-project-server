const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
class userController {
    static async handleRegisterCust(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const data = await User.create({
                ...req.body,
                role: `customer`
            })
            res.status(201).json({
                msg: `User has been created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async handleRegisterSeller(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const data = await User.create({
                ...req.body,
                role: `seller`
            })
            res.status(201).json({
                msg: `User has been created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async handleRegisterAdmin(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const data = await User.create({
                ...req.body,
                role: `admin`
            })
            res.status(201).json({
                msg: `User has been created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            const data = await User.findOne({
                where: {
                    email
                }
            })
            if (!data) {
                throw {msg: `Email or Username and Password is Invalid`}
            }
            const validPass = bcrypt.compareSync(password, data.password)
            if (!validPass) {
                throw {msg: `Email or Username and Password is Invalid`}
            }
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            const access_token = jwt.sign(payload, process.env.SECRET)
            res.status(200).json({
                access_token,
                fname: data.fname,
                id: data.id
            })
        } catch (err) {
            next(err)
        }
    }

    static async readUserById(req, res, next){
        try {
            const {id} = req.params
            console.log("🚀 ~ file: userController.js ~ line 91 ~ userController ~ readUserById ~ id", id)
            const data = await User.findByPk(id, {
                attributes: ['fName', 'lName', 'userImg']
            })
            res.status(200).json(data)
        } catch (err) {
            console.log("🚀 ~ file: userController.js ~ line 98 ~ userController ~ readUserById ~ err", err)
            next(err)
        }
    }
}

module.exports = userController