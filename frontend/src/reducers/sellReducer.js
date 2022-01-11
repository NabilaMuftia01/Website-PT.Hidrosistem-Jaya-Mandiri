import { sellConstant } from "../constants/sellConstant";

export const allSellReducer = (state = { sells: [] }, action) => {
    switch (action.type) {
        case sellConstant.ALL_SELL_REQUEST:
            return {
                loading: true,
                sells: [],
            }
        case sellConstant.ALL_SELL_SUCCESS:
            return {
                loading: false,
                sells: action.payload.sells
            }
        case sellConstant.ALL_SELL_FAILURE:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const sellDetailsReducer = (state = { sell: {} }, action) => {
    switch (action.type) {
        case sellConstant.SELL_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case sellConstant.SELL_DETAILS_SUCCESS:
            return {
                loading: false,
                sell: action.payload
            }
        case sellConstant.SELL_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case sellConstant.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newSellReducer = (state = {}, action) => {
    switch (action.type) {
        case sellConstant.CREATE_SELL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case sellConstant.CREATE_SELL_SUCCESS:
            return {
                loading: false,
                sell: action.payload,
            }
        case sellConstant.CREATE_SELL_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case sellConstant.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const sellReducer = (state = {}, action) => {
    switch (action.type) {
        case sellConstant.UPDATE_SELL_REQUEST:
        case sellConstant.DELETE_SELL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case sellConstant.UPDATE_SELL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case sellConstant.DELETE_SELL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case sellConstant.UPDATE_SELL_FAILURE:
        case sellConstant.DELETE_SELL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case sellConstant.UPDATE_SELL_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case sellConstant.DELETE_SELL_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case sellConstant.CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state
    }
}