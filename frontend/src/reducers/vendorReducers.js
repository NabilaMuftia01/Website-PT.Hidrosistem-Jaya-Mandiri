import {
    vendorConstants,
    clearErrors
} from '../constants/vendorConstants'

export const vendorReducers = (state = { vendors: [] }, action) => {
    switch (action.type) {
        case vendorConstants.ALL_VENDOR_REQUEST:
            return {
                loading: true,
                vendors: []
            }
        case vendorConstants.ALL_VENDOR_SUCCESS:
            return {
                loading: false,
                vendors: action.payload
            }
        case vendorConstants.ALL_VENDOR_FAILURE:
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

export const vendorDetailsReducer = (state = { vendor: {} }, action) => {
    switch (action.type) {
        case vendorConstants.VENDOR_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case vendorConstants.VENDOR_DETAIL_SUCCESS:
            return {
                loading: false,
                vendor: action.payload
            }
        case vendorConstants.VENDOR_DETAIL_FAILURE:
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

export const newVendorReducer = (state = { vendor: {} }, action) => {
    switch (action.type) {
        case vendorConstants.NEW_VENDOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case vendorConstants.NEW_VENDOR_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                vendor: action.payload.vendor
            }
        case vendorConstants.NEW_VENDOR_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case vendorConstants.NEW_VENDOR_RESET:
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

export const vendorReducer = (state = {}, action) => {
    switch (action.type) {
        case vendorConstants.DELETE_VENDOR_REQUEST:
        case vendorConstants.UPDATE_VENDOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case vendorConstants.DELETE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case vendorConstants.UPDATE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case vendorConstants.DELETE_VENDOR_FAILURE:
        case vendorConstants.UPDATE_VENDOR_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case vendorConstants.DELETE_VENDOR_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case vendorConstants.UPDATE_VENDOR_RESET:
            return {
                ...state,
                isUpdated: false
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