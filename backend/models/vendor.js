const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    kdvndr: {
        type: String,
        required: [true, 'Masukan Kode Vendor'],
        trim: true,
    },
    namavendor: {
        type: String,
        required: [true, 'Masukan Nama Vendor'],
        trim: true,
    },
    notlp: {
        type: String,
        required: [true, 'Masukan Nomor Telepon Vendor']
    },
    labelalamat: {
        type: String,
        required: [true, 'Masukan Alamat']
    },
    kota: {
        type: String,
        required: [true, 'Masukan Kota'],
    },
    kodepos: {
        type: String,
        required: [true, 'Masukan Kode pos']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vendor', vendorSchema)