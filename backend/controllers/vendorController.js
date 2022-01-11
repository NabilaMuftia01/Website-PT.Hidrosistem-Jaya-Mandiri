const Vendor = require('../models/vendor')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//create new vendor => /backend/admin/vendor/new
exports.createVendor = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.body.id
    const vendor = await Vendor.create(req.body)

    res.status(200).json({
        success: true,
        vendor
    })
})

//get all vendor => /backend/vendors && /vendors
exports.allVendors = catchAsyncErrors(async (req, res, next) => {
    const vendors = await Vendor.find()

    res.status(200).json({
        success: true,
        vendors
    })
})

//update vendor => /backend/admin/vendor/:id
exports.updateVendor = catchAsyncErrors(async (req, res, next) => {
    let vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
        return next(new ErrorHandler('Vendor not found', 404))
    }

    vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        vendor
    })
})

//get vendor detail => /backend/admin/vendor/:id && /backend/vendor/:id
exports.getVendorDetails = catchAsyncErrors(async (req, res, next) => {
    const vendor = await Vendor.findById(req.params.id)

    if (!vendor) {
        return next(new ErrorHandler(`Vendor not found with id ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        vendor
    })
})

//delete vendor => /backend/admin/vendor/:id
exports.deleteVendor = catchAsyncErrors(async (req, res, next) => {
    const vendor = await Vendor.findById(req.params.id)

    if (!vendor) {
        return next(new ErrorHandler('Vendor not found', 404))
    }
    await vendor.remove()

    res.status(200).json({
        success: true,
        message: 'Vendor deleted successfully'
    })
})