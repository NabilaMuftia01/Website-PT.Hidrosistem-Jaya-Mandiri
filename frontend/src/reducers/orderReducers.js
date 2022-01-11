import { orderCosntants } from "../constants/orderConstant";

export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case orderCosntants.ALL_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case orderCosntants.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
            }
        case orderCosntants.ALL_ORDERS_FAILURE:
            return {
                loading: false,
                errors: action.payload
            }
        case orderCosntants.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case orderCosntants.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case orderCosntants.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case orderCosntants.ORDER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case orderCosntants.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case orderCosntants.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case orderCosntants.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case orderCosntants.CREATE_ORDER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case orderCosntants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case orderCosntants.UPDATE_ORDER_REQUEST:
        case orderCosntants.DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case orderCosntants.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case orderCosntants.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case orderCosntants.UPDATE_ORDER_FAILURE:
        case orderCosntants.DELETE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case orderCosntants.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case orderCosntants.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case orderCosntants.CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state
    }
}