const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    kdbrg: {
        type: String,
        required: [true, 'Masukan Kode Barang'],
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Masukan Nama Barang'],
        trim: true,
    },
    namavendor: {
        type: String,
        required: [true, 'Masukan Nama Vendor'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'Masukan Stock Barang'],
        default: 0
    },
    satuan: {
        type: String,
        required: [true, 'Masukan Satuan Barang'],
    },
    kdgroup: {
        type: String,
        enum: {
            values: [
                'Common Part',
                'PTO',
                'Hydraulic Tank',
                'Pump',
                'Valve',
                'Motor',
                'Fitting',
                'Hose',
                'Adaptor',
                'Accessories'
            ],
            message: 'Masukan Kategori Yang Benar'
        }
    },
    hjual: {
        type: Number,
        default: 0
    },
    hbeli: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema)