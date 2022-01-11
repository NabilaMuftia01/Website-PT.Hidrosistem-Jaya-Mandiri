const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Masukan Email'],
        unique: true,
        validate: [validator.isEmail, 'Email Tidak Valid']
    },
    username: {
        type: String,
        required: [true, 'Masukan Username'],
        maxlength: [16, 'Panjang Karakter Tidak bisa 16 Karakter'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Masukan Password'],
        minlength: [8, 'Minimal 8 Karakter'],
        select: false,
    },
    namapengguna: {
        type: String,
        required: [true, 'Masukan Nama Anda'],
    },
    role: {
        type: String,
        default: 'checker'
        // default role is checker
        // 3 different roles : superadmin, admin, checker
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

//encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// return JWT token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generate token 
    const resetToken = crypto.randomBytes(20).toString('hex')

    // hash and set to reset password token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expired time reset
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}
module.exports = mongoose.model('User', userSchema)

//admin account
//username : superadmin321 pass : superadmin
//checker account
//username : checker pass : checkerganteng