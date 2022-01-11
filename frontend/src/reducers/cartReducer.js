import { cartConstant } from "../constants/cartConstants";

export const cartReducer = (state = { listItems: {}, shippingInfo: {} }, action) => {
    switch (action.type) {
        case cartConstant.ADD_TO_CART:
            return {
                ...state,
                listItems: action.payload
            }
        case cartConstant.SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        default:
            return state
    }
}

export const sellCartReducer = (state = { sellItems: {}, shippingSellerInfo: {} }, action) => {
    switch (action.type) {
        case cartConstant.ADD_TO_SELL_CART:
            return {
                ...state,
                sellItems: action.payload
            }
        case cartConstant.SAVE_SHIPPING_SELLER_INFO:
            return {
                ...state,
                shippingSellerInfo: action.payload
            }
        default:
            return state
    }
}