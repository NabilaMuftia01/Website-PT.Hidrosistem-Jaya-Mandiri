import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer, allUsersReducer, userReducer, registerUserReducer } from './reducers/authReducers';
import { productReducers, productDetailsReducer, newProductReducer, productReducer } from './reducers/productReducers'
import { vendorReducers, vendorDetailsReducer, newVendorReducer, vendorReducer } from './reducers/vendorReducers';
import { customerReducers, customerDetailsReducer, newCustomerReducer, customerReducer } from './reducers/customerReducers';
import { allOrderReducer, newOrderReducer, orderReducer, orderDetailsReducer } from './reducers/orderReducers'
import { allSellReducer, newSellReducer, sellReducer, sellDetailsReducer } from './reducers/sellReducer';
import { cartReducer, sellCartReducer } from './reducers/cartReducer';

const reduser = combineReducers({
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    registerUser: registerUserReducer,
    //--------//
    products: productReducers,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    //--------//
    vendors: vendorReducers,
    vendorDetails: vendorDetailsReducer,
    newVendor: newVendorReducer,
    vendor: vendorReducer,
    //--------//
    customers: customerReducers,
    newCustomer: newCustomerReducer,
    customer: customerReducer,
    customerDetails: customerDetailsReducer,
    //--------//
    newOrder: newOrderReducer,
    allOrder: allOrderReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    //--------//
    newSell: newSellReducer,
    allSell: allSellReducer,
    sell: sellReducer,
    sellDetails: sellDetailsReducer,
    //--------//
    cart: cartReducer,
    sellCart: sellCartReducer,
})

let initialState = {
    cart: {
        listItems: localStorage.getItem('listItems')
            ? JSON.parse(localStorage.getItem('listItems'))
            : {},
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    },

    sellCart: {
        sellItems: localStorage.getItem('sellItems')
            ? JSON.parse(localStorage.getItem('sellItems'))
            : {},
        shippingSellerInfo: localStorage.getItem('shippingSellerInfo')
            ? JSON.parse(localStorage.getItem('shippingSellerInfo'))
            : {}
    }
}

const middleware = [thunk]
const store = createStore(reduser, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store