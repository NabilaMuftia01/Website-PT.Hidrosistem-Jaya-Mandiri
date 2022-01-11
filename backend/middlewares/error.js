const ErrorHandler = require('../utils/errorHandler')


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if (process.env.NODE_ENV.trim() === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV.trim() === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message

        //wrong mongoose object ID error
        if (err.name === 'CastError') {
            const message = `Resoouce not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //handling mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }

        //handling mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyvalue)} entered`
            error = new ErrorHandler(message, 400)
        }

        //handling wrong JWT errors
        if (err.code === 'JsonWebTokenError') {
            const message = `JSON Web Token is invalid`
            error = new ErrorHandler(message, 400)
        }

        //handling expired JWT errors
        if (err.code === 'TokenExpiredError') {
            const message = `Sesi Login Sudah Habis, Silahkan Login Kembali`
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}
