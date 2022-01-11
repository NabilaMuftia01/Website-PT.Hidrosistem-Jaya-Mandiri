import {
    customerConstants,
    clearErrors
} from '../constants/customerConstants'

export const customerReducers = (state = { customers: [] }, action) => {
    switch (action.type) {
        case customerConstants.ALL_CUSTOMER_REQUEST:
            return {
                loading: true,
                customers: []
            }
        case customerConstants.ALL_CUSTOMER_SUCCESS:
            return {
                loading: false,
                customers: action.payload
            }
        case customerConstants.ALL_CUSTOMER_FAILURE:
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

export const customerDetailsReducer = (state = { customer: {} }, action) => {
    switch (action.type) {
        case customerConstants.CUSTOMER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case customerConstants.CUSTOMER_DETAIL_SUCCESS:
            return {
                loading: false,
                customer: action.payload
            }
        case customerConstants.CUSTOMER_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case clearErrors.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newCustomerReducer = (state = { customer: {} }, action) => {
    switch (action.type) {
        case customerConstants.NEW_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case customerConstants.NEW_CUSTOMER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                customer: action.payload.customer
            }
        case customerConstants.NEW_CUSTOMER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case customerConstants.NEW_CUSTOMER_RESET:
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

export const customerReducer = (state = {}, action) => {
    switch (action.type) {
        case customerConstants.DELETE_CUSTOMER_REQUEST:
        case customerConstants.UPDATE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case customerConstants.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case customerConstants.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case customerConstants.DELETE_CUSTOMER_FAILURE:
        case customerConstants.UPDATE_CUSTOMER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case customerConstants.DELETE_CUSTOMER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case customerConstants.UPDATE_CUSTOMER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        default:
            return state
    }
}