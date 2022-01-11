const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const {
    createVendor,
    allVendors,
    updateVendor,
    deleteVendor,
    getVendorDetails
} = require('../controllers/vendorController')

//checker can access
router.route('/vendors').get(isAuthenticatedUser, allVendors)
router.route('/vendor/:id').get(isAuthenticatedUser, getVendorDetails)

//superadmin and admin can access
router.route('/admin/vendor/new').post(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), createVendor)
router.route('/admin/vendors').get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), allVendors)
router.route('/admin/vendor/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), getVendorDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), updateVendor)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), deleteVendor)


module.exports = router