const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
    seller: {
        namacus: {
            type: String,
            required: true
        },
        notlp: {
            type: String,
            required: true
        },
        labelalamat: {
            type: String,
            required: true
        },
        kota: {
            type: String,
            required: true
        },
        kodepos: {
            type: String,
            required: true
        }
    },
    Items:
    {
        kdbrg: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        namavendor: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        hjual: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    //totalPrice = hbeli * quantity
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
    },
    deliveredAt: {
        type: Date
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sell', sellSchema)