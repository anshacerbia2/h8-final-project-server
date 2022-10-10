const router = require('express').Router()
const userRouter = require('../routes/user');
const custRouter = require('../routes/cust');
const sellerRouter = require('../routes/seller');
const adminRouter = require('../routes/admin');
const { Auth, AuthorizationAdmin, AuthorizationSeller } = require('../middlewares');

router.use('/', userRouter)
router.use('/cust', custRouter)

router.use(Auth)
router.use('/seller', AuthorizationSeller,sellerRouter)
router.use('/admin', AuthorizationAdmin, adminRouter)

module.exports = router
