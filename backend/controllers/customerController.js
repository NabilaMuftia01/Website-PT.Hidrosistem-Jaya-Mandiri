const Customer = require('../models/customer')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const vendor = require('../models/vendor')

//create a new customer => /backend/admin/customer/new
exports.createCustomer = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.body.id
    const customer = await Customer.create(req.body)

    res.status(200).json({
        success: true,
        customer
    })
})

//get all customers => (checker) /backend/customer && (admin) /backend/admin/customer
exports.allCustomer = catchAsyncErrors(async (req, res, next) => {
    const customers = await Customer.find()

    res.status(200).json({
        success: true,
        customers
    })
})

//update customer
exports.updateCustomer = catchAsyncErrors(async (req, res, next) => {
    let customer = await Customer.findById(req.params.id)

    if (!customer) {
        return next(new ErrorHandler('Customer not found'), 404);
    }

    customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        customer
    })
})

//get detail customer => (checker) /backend/customer/:id && (admin) /backend/admin/customer/:id
exports.getCustomerDetails = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return next(new ErrorHandler(`Customer not found with id ${req.params.id}`), 404);
    }

    res.status(200).json({
        success: true,
        customer
    })
})

//delete customer
exports.deleteCustomer = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) {
        return next(new ErrorHandler('Customer not found', 404))
    }
    await customer.remove()

    res.status(200).json({
        success: true,
        message: 'Customer deleted successfully'
    })
})