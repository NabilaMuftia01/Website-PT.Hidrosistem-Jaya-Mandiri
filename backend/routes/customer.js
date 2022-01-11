const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const {
    createCustomer,
    allCustomer,
    updateCustomer,
    getCustomerDetails,
    deleteCustomer
} = require('../controllers/customerController')

//checker can access
router.route('/customers').get(isAuthenticatedUser, allCustomer)
router.route('/customer/:id').get(isAuthenticatedUser, getCustomerDetails)

//superadmin and admin can access
router.route('/admin/customer/new').post(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), createCustomer)
router.route('/admin/customers').get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), allCustomer)
router.route('/admin/customer/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), updateCustomer)
    .get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), getCustomerDetails)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), deleteCustomer)

module.exports = router