import { authConstants } from "../constants/authConstants";
import axios from 'axios'


//REGISTER USER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: authConstants.USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/backend/register', userData, config)
        dispatch({
            type: authConstants.USER_REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: authConstants.USER_REGISTER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//Login
export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/backend/login', { username, password }, config)

        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: error.response.data.message
        })
    }
}

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: authConstants.LOAD_USER_REQUEST
        })
        const { data } = await axios.get('/backend/profile')
        dispatch({
            type: authConstants.LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: authConstants.LOAD_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//Load All Users
export const allUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: authConstants.ALL_USERS_REQUEST
        })
        const { data } = await axios.get('/backend/admin/users')
        dispatch({
            type: authConstants.ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: authConstants.ALL_USERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: authConstants.DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/backend/admin/user/${id}`)

        dispatch({
            type: authConstants.DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: authConstants.DELETE_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/backend/logout')

        dispatch({
            type: authConstants.LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE PASSWORD
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: authConstants.UPDATE_PASSWORD_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/backend/password/update', passwords, config)
        dispatch({
            type: authConstants.UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: authConstants.UPDATE_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: authConstants.CLEAR_ERRORS
    })
}