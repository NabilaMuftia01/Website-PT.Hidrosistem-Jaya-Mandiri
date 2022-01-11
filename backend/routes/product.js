const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')


//checker can access
router.route('/products').get(getProducts)
router.route('/product/:id')
    .get(isAuthenticatedUser, getSingleProduct)

//only admin and superadmin can access
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), getProducts)
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), newProduct)
router.route('/admin/product/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), getSingleProduct)
    .put(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), deleteProduct)

module.exports = router