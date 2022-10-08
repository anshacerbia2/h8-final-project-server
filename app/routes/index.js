const router = require('express').Router()
const userRouter = require('../routes/user');
const custRouter = require('../routes/cust');
const sellerRouter = require('../routes/seller');
const adminRouter = require('../routes/admin');
const { Auth } = require('../middlewares');

router.use('/', userRouter)
router.use('/pub', custRouter)

router.use(Auth)
router.use('/seller', sellerRouter)
router.use('/admin', adminRouter)

module.exports = router
