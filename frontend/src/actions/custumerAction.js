import { customerConstants, clearErrors } from "../constants/customerConstants";
import axios from 'axios'

export const getCustomers = () => async (dispatch) => {
    try {
        dispatch({
            type: customerConstants.ALL_CUSTOMER_REQUEST
        })
        const { data } = await axios.get('/backend/customers')
        dispatch({
            type: customerConstants.ALL_CUSTOMER_SUCCESS,
            payload: data.customers
        })
    } catch (error) {
        dispatch({
            type: customerConstants.ALL_CUSTOMER_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const getCustomerDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: customerConstants.CUSTOMER_DETAIL_REQUEST
        })
        const { data } = await axios.get(`/backend/customer/${id}`)
        dispatch({
            type: customerConstants.CUSTOMER_DETAIL_SUCCESS,
            payload: data.customer
        })
    } catch (error) {
        dispatch({
            type: customerConstants.CUSTOMER_DETAIL_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const newCustomer = (customerData) => async (dispatch) => {
    try {
        dispatch({ type: customerConstants.NEW_CUSTOMER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/backend/admin/customer/new', customerData, config);

        dispatch({
            type: customerConstants.NEW_CUSTOMER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: customerConstants.NEW_CUSTOMER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE CUSTOMER
export const updateCustomer = (id, customerData) => async (dispatch) => {
    try {
        dispatch({ type: customerConstants.UPDATE_CUSTOMER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/backend/admin/customer/${id}`, customerData, config);
        dispatch({
            type: customerConstants.UPDATE_CUSTOMER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: customerConstants.UPDATE_CUSTOMER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DELETE CUSTOMER
export const deleteCustomer = (id) => async (dispatch) => {
    try {
        dispatch({
            type: customerConstants.DELETE_CUSTOMER_REQUEST
        })

        const { data } = await axios.delete(`/backend/admin/customer/${id}`)
        dispatch({
            type: customerConstants.DELETE_CUSTOMER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: customerConstants.DELETE_CUSTOMER_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({
        type: clearErrors.CLEAR_ERRORS
    })
}