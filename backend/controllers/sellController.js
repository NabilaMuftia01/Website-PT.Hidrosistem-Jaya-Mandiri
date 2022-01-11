//COSTUMER CONTROLLERS
const Sell = require('../models/sell')
const Product = require('../models/product')
const Customer = require('../models/customer')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//create a new sell product => /backend/admin/sell/new
exports.newSell = catchAsyncErrors(async (req, res, next) => {
    const {
        seller,
        Items,
        itemPrice,
        totalPrice,
    } = req.body;

    const sell = await Sell.create({
        seller,
        Items,
        itemPrice,
        totalPrice,
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        sell
    })
})

//get seller list => /backend/sell/:id
exports.getSingleSell = catchAsyncErrors(async (req, res, next) => {
    const sell = await Sell.findById(req.params.id).populate('user', 'name email')

    if (!sell) {
        return next(new ErrorHandler('No sell found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        sell
    })
})

//get sell list => /backend/admin/sell/buys
exports.allSell = catchAsyncErrors(async (req, res, next) => {
    const sells = await Sell.find()

    let totalAmount = 0
    sells.forEach(sell => {
        totalAmount += sell.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        sells
    })
})

//update sell list => /backend/admin/sell/:id
exports.updateSell = catchAsyncErrors(async (req, res, next) => {
    const sell = await Sell.findById(req.params.id)

    if (sell.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this product'));
    }


    await updateStock(sell.Items.product, sell.Items.quantity, sell.Items.hjual)


    sell.orderStatus = req.body.status,
        sell.deliveredAt = Date.now()

    await sell.save()

    res.status(200).json({
        success: true,
    })
})

//delete sell => /backend/admin/sell/:id
exports.deleteSell = catchAsyncErrors(async (req, res, next) => {
    const sell = await Sell.findById(req.params.id)

    if (!sell) {
        return next(new ErrorHandler('No sell found with this ID', 404))
    }

    await sell.remove()

    res.status(200).json({
        success: true,
        message: 'Penjualan Telah Dihapus'
    })
})

async function updateStock(id, quantity, hjual) {
    const product = await Product.findById(id)

    product.stock = product.stock - quantity
    product.hjual = hjual

    await product.save({ validateBeforeSave: false })
}