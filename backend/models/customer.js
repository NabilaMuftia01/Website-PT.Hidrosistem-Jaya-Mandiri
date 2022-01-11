const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    namacus: {
        type: String,
        required: [true, 'Masukan Nama Customer'],
        trim: true,
    },
    notlp: {
        type: String,
        required: [true, 'Masukan Nomor Telepon Customer']
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

module.exports = mongoose.model('Customer', customerSchema)