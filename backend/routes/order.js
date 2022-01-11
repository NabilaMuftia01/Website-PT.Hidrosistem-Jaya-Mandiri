const express = require('express')
const router = express.Router()

const { newOrder, getSingleOrder, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/order/new').post(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), newOrder)
router.route('/admin/order/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), getSingleOrder)
    .put(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), deleteOrder)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), allOrders)

router.route('/orders/list').get(isAuthenticatedUser, allOrders)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)

module.exports = router