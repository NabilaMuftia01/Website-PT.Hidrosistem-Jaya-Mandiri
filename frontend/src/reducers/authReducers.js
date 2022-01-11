import { authConstants } from "../constants/authConstants";

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
        case authConstants.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case authConstants.LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case authConstants.LOGIN_SUCCESS:
        case authConstants.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case authConstants.LOAD_USER_FAILURE:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case authConstants.LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case authConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const registerUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case authConstants.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case authConstants.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                user: action.payload
            }
        case authConstants.USER_REGISTER_FAILURE:
            return {

                ...state,
                loading: false,
                error: action.payload.error,
            }
        case authConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case authConstants.ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case authConstants.ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case authConstants.ALL_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case authConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case authConstants.DELETE_USER_REQUEST:
        case authConstants.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case authConstants.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                isUpdated: action.payload
            }
        case authConstants.DELETE_USER_SUCCESS:
            return {
                ...state,
                isDeleted: action.payload
            }
        case authConstants.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: true,
            }
        case authConstants.DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: true,
            }
        case authConstants.DELETE_USER_FAILURE:
        case authConstants.UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case authConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}