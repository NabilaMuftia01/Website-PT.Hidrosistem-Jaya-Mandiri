const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { send } = require('process');

//register user => /backend/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { email, username, password, namapengguna } = req.body
    const user = await User.create({
        email,
        username,
        password,
        namapengguna
    })

    // sendToken(user, 200, res)
    res.status(200).json({
        success: true,
        user
    })
})

//login user => /backend/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body

    //check if username and password
    if (!username || !password) {
        return next(new ErrorHandler('Masukan Username & Password', 400));
    }

    //finding user in database
    const user = await User.findOne({ username }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Username dan Password Salah', 401));
    }

    //checks password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Username dan Password Salah', 401));
    }

    sendToken(user, 200, res)
})

//Forgot Password => /backend/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('Email Tidak di Temukan', 404))
    }

    //get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    //create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/backend/password/reset/${resetToken}`;

    const message = `Reset Password Ikuti Link: \n\n${resetUrl}`

    try {

        await sendEmail({
            email: user.email,
            subject: 'HJM Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email Sent To: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500));
    }
})

//Reset Password => /backend/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //hash URL tokens
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    //setup new password
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save()

    sendToken(user, 200, res)
})

//user profile => /backend/profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

//Update change password => /backend/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    //check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400))
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

//Update user profile => /backend/profile/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

//logout user => /backend/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Akun Berhasil Keluar'
    })
})



//get all users => /backend/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

//get user details => /backend/admin/users/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


//Update user profile => /backend/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

//delete user => /backend/admin/users/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`))
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: `User successfully delete`
    })
})