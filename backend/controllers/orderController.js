//VENDOR CONDTROLLER
const Order = require('../models/order');
const Product = require('../models/product');
const Vendor = require('../models/vendor');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//create a new order => /backend/admin/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        buyer,
        Items,
        itemPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        buyer,
        Items,
        itemPrice,
        totalPrice,
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

//get single order => /backend/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//get order list => /backend/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//update order list => /backend/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this product'))
    }

    await updateStock(order.Items.product, order.Items.quantity, order.Items.hbeli)

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

//delete order => /backend/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: 'Pembelian Telah Dihapus'
    })
})

async function updateStock(id, quantity, hbeli) {
    const product = await Product.findById(id)

    product.stock = product.stock + quantity
    product.hbeli = hbeli

    await product.save({ validateBeforeSave: false })
}