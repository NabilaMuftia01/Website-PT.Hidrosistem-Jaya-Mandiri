import axios from 'axios'
import { cartConstant } from '../constants/cartConstants'

export const addItemToCart = (id, quantity, hbeli) => async (dispatch, getState) => {
    const { data } = await axios.get(`/backend/product/${id}`)
    dispatch({
        type: cartConstant.ADD_TO_CART,
        payload: {
            product: data.product._id,
            kdbrg: data.product.kdbrg,
            name: data.product.name,
            namavendor: data.product.namavendor,
            hbeli,
            quantity
        }
    })
    localStorage.setItem('listItems', JSON.stringify(getState().cart.listItems))
}

export const addItemToSellCart = (id, quantity, hjual) => async (dispatch, getState) => {
    const { data } = await axios.get(`/backend/product/${id}`)
    dispatch({
        type: cartConstant.ADD_TO_SELL_CART,
        payload: {
            product: data.product._id,
            kdbrg: data.product.kdbrg,
            name: data.product.name,
            namavendor: data.product.namavendor,
            hjual,
            quantity
        }
    })
    localStorage.setItem('sellItems', JSON.stringify(getState().sellCart.sellItems))
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: cartConstant.SAVE_SHIPPING_INFO,
        payload: data,
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}

export const saveShippingSellerInfo = (data) => async (dispatch) => {
    dispatch({
        type: cartConstant.SAVE_SHIPPING_SELLER_INFO,
        payload: data,
    })
    localStorage.setItem('shippingSellerInfo', JSON.stringify(data))
}
