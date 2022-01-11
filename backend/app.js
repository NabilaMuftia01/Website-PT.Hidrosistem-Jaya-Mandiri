const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const path = require('path');

//setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())

//Import Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const vendor = require('./routes/vendor');
const customer = require('./routes/customer');
const order = require('./routes/order');
const sell = require('./routes/sell');

//app.use
app.use('/backend', products)
app.use('/backend', auth)
app.use('/backend', vendor)
app.use('/backend', customer)
app.use('/backend', order)
app.use('/backend', sell)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
app.use(errorMiddleware)

module.exports = app