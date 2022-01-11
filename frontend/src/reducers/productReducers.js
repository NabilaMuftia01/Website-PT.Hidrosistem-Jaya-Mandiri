import {
    productConstants,
    clearErrors
} from '../constants/productConstants'


export const productReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants.ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case productConstants.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case productConstants.ALL_PRODUCT_FAILURE:
            return {
                loading: false,
                errors: action.payload
            }
        case clearErrors.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case productConstants.PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case clearErrors.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case productConstants.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case productConstants.NEW_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case productConstants.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case clearErrors.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstants.DELETE_PRODUCT_REQUEST:
        case productConstants.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case productConstants.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case productConstants.DELETE_PRODUCT_FAILURE:
        case productConstants.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case productConstants.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case productConstants.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        default:
            return state
    }
}