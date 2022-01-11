const express = require('express');
const router = express.Router();

const { newSell, getSingleSell, allSell, updateSell, deleteSell } = require('../controllers/sellController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/sell/new').post(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), newSell)
router.route('/admin/sells').get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), allSell)
router.route('/admin/sell/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), getSingleSell)
    .put(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), updateSell)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'superadmin'), deleteSell)


router.route('/sell/:id').get(isAuthenticatedUser, getSingleSell)
router.route('/sells/list').get(isAuthenticatedUser, allSell)

module.exports = router